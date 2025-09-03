import { getAccessToken } from '../../utils/spotify.js';
import {
    okResponse,
    badRequestResponse,
    serverErrorResponse,
    notFoundResponse,
    createdResponse,
} from '../../utils/responseHelper.js';
import { formatItem } from '../../utils/formatter.js';
import Song from '../../models/Song.js';
import Album from '../../models/Album.js';
import fs from 'fs';
import path from 'path';

class AdminMusicController {
    async searchTrack(req, res) {
        try {
            const { q, limit } = req.query;
            if (!q) return badRequestResponse(res, 'Search keyword is required');

            const token = await getAccessToken();

            let url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track`;
            if (limit) url += `&limit=${limit}`;

            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) return notFoundResponse(res, 'No results found');

            const data = await response.json();
            return okResponse(res, 'Search successful', data);
        } catch (error) {
            console.error('Error searchSpotify:', error);
            return serverErrorResponse(res, error.message);
        }
    }

    async addTrack(req, res) {
        try {
            const { id } = req.params;
            const spotifyId = id;
            const createdBy = req.user._id;
            if (!id) {
                return badRequestResponse(res, 'Missing Id');
            }

            // kiểm tra tồn tại
            const existing = await Song.findOne({ spotifyId });
            if (existing) {
                return badRequestResponse(res, 'Already exists');
            }

            //Lấy thông tin bài hát qua spotify
            const token = await getAccessToken();

            const spotifyResponse = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!spotifyResponse.ok) return notFoundResponse(res, 'No results found');

            const spotifyData = await spotifyResponse.json();

            const artists = spotifyData.artists.map((a, index) => ({
                id: a.id,
                name: a.name,
                href: a.href,
                role: index === 0 ? 'main' : 'feat',
            }));

            const name = spotifyData.name;

            //Tạo mơi album
            let albumId = null;
            if (spotifyData.album) {
                const albumSpotifyId = spotifyData.album.id;

                let album = await Album.findOne({ spotifyId: albumSpotifyId });

                if (!album) {
                    album = await Album.create({
                        spotifyId: albumSpotifyId,
                        name: spotifyData.album.name,
                        images: spotifyData.album.images.map((img) => ({
                            url: img.url,
                            height: img.height,
                            width: img.width,
                        })),
                        release_date: spotifyData.album.release_date,
                        release_date_precision: spotifyData.album.release_date_precision,
                        artists: spotifyData.album.artists.map((artist) => ({
                            id: artist.id,
                            name: artist.name,
                        })),
                    });
                }

                albumId = album._id;
            }

            //tạo mới song
            const newTrack = await Song.create({
                spotifyId,
                artists,
                name,
                album: albumId,
                createdBy,
            });

            return createdResponse(
                res,
                'Added successfully',
                formatItem(newTrack, ['_id', 'name', 'album', 'artists', 'isReady']),
            );
        } catch (err) {
            console.error('Error add:', err);
            return serverErrorResponse(res, err.message);
        }
    }

    async addTrackAudio(req, res) {
        try {
            const { id } = req.params;
            if (!req.file) {
                return badRequestResponse(res, 'No audio file uploaded');
            }
            const newAudioUrl = `/uploads/audios/${req.file.filename}`;
            const song = await Song.findById(id);
            if (!song) {
                return notFoundResponse(res, 'Song not found');
            }
            const oldAudioPath = song.url ? path.join(process.cwd(), 'src', song.url) : null;

            song.url = newAudioUrl;
            song.isReady = true;
            await song.save();

            // xoá file cũ (nếu tồn tại)
            if (oldAudioPath && fs.existsSync(oldAudioPath)) {
                fs.unlinkSync(oldAudioPath);
            }

            return okResponse(res, 'Audio uploaded successfully', song);
        } catch (err) {
            console.error(err);
            return serverErrorResponse(res, 'Error uploading audio');
        }
    }

    async getAllTracks(req, res) {
        try {
            const items = await Song.find({})
                .select('_id spotifyId name album artists isReady')
                .sort({ createdAt: -1 })
                .lean();

            return okResponse(res, '', items);
        } catch (err) {
            console.error('Error getTracksAndPlaylist:', err);
            return serverErrorResponse(res, err.message);
        }
    }

    async removeTrack(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return badRequestResponse(res, 'Missing Id');
            }

            const track = await Song.findById(id);
            if (!track) {
                return notFoundResponse(res, 'track not found');
            }

            // Lưu lại albumId, oldUrlAudio trước khi xóa
            const oldAudioPath = track.url ? path.join(process.cwd(), 'src', track.url) : null;
            const albumId = track.album._id;

            // Xóa bài hát
            await Song.deleteOne({ _id: id });
            // xoá file cũ (nếu tồn tại)
            if (oldAudioPath && fs.existsSync(oldAudioPath)) {
                fs.unlinkSync(oldAudioPath);
            }

            // Nếu bài hát có album thì kiểm tra còn bài nào thuộc album không
            if (albumId) {
                const count = await Song.countDocuments({ album: albumId });
                if (count === 0) {
                    await Album.deleteOne({ _id: albumId });
                }
            }

            return okResponse(res, 'track removed successfully');
        } catch (error) {
            console.error(error);
            return serverErrorResponse(res, error.message);
        }
    }
}

export default new AdminMusicController();
