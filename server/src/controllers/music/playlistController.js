// controllers/music/spotifyController.js
import {
    okResponse,
    badRequestResponse,
    serverErrorResponse,
    createdResponse,
    notFoundResponse,
    forbiddenResponse,
} from '../../utils/responseHelper.js';
import Playlist from '../../models/Playlist.js';
import Song from '../../models/Song.js';
import SavedPlaylist from '../../models/SavedPlaylist.js';
import User from '../../models/User.js';
import { formatItems, formatItem } from '../../utils/formatter.js';
import { MESSAGE_RESPONSE } from '../../constants/index.js';

class playlistController {
    createPlaylist = async (req, res) => {
        const file = req?.file || null;
        let fileName = '';
        if (file) {
            fileName = `/uploads/playlist-avatars/${file.filename}`;
        }
        try {
            const { playlistName, playlistDescription, isPublic } = req.body;
            if (!playlistName) {
                return badRequestResponse(res, MESSAGE_RESPONSE.PLAYLIST.EMPTY_NAME);
            }

            const playlist = new Playlist({
                owner: req.user._id,
                name: playlistName,
                description: playlistDescription,
                isPublic: isPublic,
                images: fileName,
            });

            await playlist.save();
            await playlist.populate('owner', '_id avatarUrl firstName lastName');

            const formatted = formatItem(playlist, [
                '_id',
                'name',
                'owner',
                'images',
                'description',
                'isPublic',
                'createdAt',
            ]);

            formatted.isOwner = true;
            formatted.trackIds = [];

            return createdResponse(res, MESSAGE_RESPONSE.PLAYLIST.CREATE_SUCCESS, formatted);
        } catch (err) {
            console.error('❌ Create playlist error:', err);
            return serverErrorResponse(res);
        }
    };

    addTrackToFavorite = async (req, res) => {
        const userId = req.user._id;
        const trackId = req.params.id;

        if (!trackId) {
            return badRequestResponse(res, 'Track ID is required');
        }

        try {
            const track = await Song.findById(trackId);
            if (!track || !track.isReady) {
                return notFoundResponse(res, 'Track not found');
            }

            // Tìm playlist favorite của user
            let favorite = await Playlist.findOne({ owner: userId, type: 'favorite' });

            if (!favorite) {
                // Nếu chưa có → tạo mới playlist favorite
                favorite = await Playlist.create({
                    owner: userId,
                    name: 'Favorite Songs',
                    description: 'A collection of your all-time favorite tracks. Enjoy listening!',
                    type: 'favorite',
                    isPublic: false,
                    tracks: [],
                });
            }

            // Check nếu track đã có trong favorite
            const exists = favorite.tracks.some((t) => t.track.toString() === trackId);
            if (exists) {
                return badRequestResponse(res, 'Track already in favorite');
            }

            // Nếu chưa có → thêm mới
            favorite.tracks.push({
                track: trackId,
                addedAt: Date.now(),
            });

            await favorite.save();

            // Populate đúng bài hát vừa thêm
            const populatedTrack = await Playlist.findOne(
                { _id: favorite._id, 'tracks.track': trackId },
                { 'tracks.$': 1 }, // chỉ lấy phần tử mới thêm
            )
                .populate({
                    path: 'tracks.track',
                    select: '_id name artists album',
                    populate: {
                        path: 'album',
                        select: '_id spotifyId name images',
                    },
                })
                .lean();

            return okResponse(res, 'Track added to favorite', populatedTrack.tracks[0]);
        } catch (error) {
            console.error('[addTrackToFavorite] Error:', error);
            return serverErrorResponse(res, 'Failed to add track to favorite');
        }
    };

    // 📌 Xoá bài hát khỏi playlist type = favorite
    removeTrackFromFavorite = async (req, res) => {
        const userId = req.user._id;
        const trackId = req.params.id;

        if (!trackId) {
            return badRequestResponse(res, 'Track ID is required');
        }

        try {
            // Tìm playlist favorite
            const favorite = await Playlist.findOne({ owner: userId, type: 'favorite' });

            if (!favorite) {
                return notFoundResponse(res, 'Favorite playlist not found');
            }

            // Check bài hát có tồn tại trong favorite không
            const exists = favorite.tracks.some((t) => t.track.toString() === trackId);
            if (!exists) {
                return notFoundResponse(res, 'Track not in favorite');
            }

            // Lọc bỏ track
            favorite.tracks = favorite.tracks.filter((t) => t.track.toString() !== trackId);

            await favorite.save();

            return okResponse(res, 'Track removed from favorite', favorite);
        } catch (error) {
            console.error('[removeTrackFromFavorite] Error:', error);
            return serverErrorResponse(res, 'Failed to remove track from favorite');
        }
    };

    deletePlaylist = async (req, res) => {
        const { id } = req.params;
        const userId = req.user._id;

        if (!id) {
            return badRequestResponse(res, 'Bad Request');
        }

        try {
            const playlist = await Playlist.findById(id);

            // Nếu playlist tồn tại và user là owner -> xóa hẳn
            if (playlist && playlist.owner.toString() === userId.toString()) {
                await playlist.deleteOne();
                await SavedPlaylist.deleteMany({ playlist: id });
                return okResponse(res, 'Playlist deleted successfully');
            }

            // Nếu không phải owner thì check xem user có lưu playlist này không
            const saved = await SavedPlaylist.findOne({ user: userId, playlist: id });
            if (saved) {
                await saved.deleteOne();
                return okResponse(res, 'Playlist removed from your library');
            }

            // Nếu không tồn tại playlist hoặc không lưu thì báo lỗi
            if (!playlist) {
                return notFoundResponse(res, MESSAGE_RESPONSE.PLAYLIST.NOT_FOUND);
            }

            return forbiddenResponse(res, 'You cannot delete this playlist');
        } catch (err) {
            console.log('delete Playlist error', err);
            return serverErrorResponse(res, err.message);
        }
    };

    getUserPlaylists = async (req, res) => {
        const userId = req.user._id;

        try {
            // 1️⃣ Lấy playlist của user
            const userPlaylists = await Playlist.find({ owner: userId, type: 'playlist' })
                .populate('owner', '_id avatarUrl firstName lastName')
                .lean();

            // 2️⃣ Lấy saved playlists của user
            const userDoc = await User.findById(userId)
                .populate({
                    path: 'savedPlaylists',
                    populate: { path: 'owner', select: '_id avatarUrl firstName lastName' },
                })
                .lean();
            const savedPlaylists = userDoc?.savedPlaylists || [];

            // 3️⃣ Gắn cờ isOwner và lấy trackIds
            const owned = userPlaylists.map((pl) => ({
                ...pl,
                isOwner: true,
                trackIds: pl.tracks?.map((t) => t.track) || [],
            }));

            const saved = savedPlaylists.map((pl) => ({
                ...pl,
                isOwner: false,
                trackIds: pl.tracks?.map((t) => t.track) || [],
            }));

            // 4️⃣ Gộp, sắp xếp, format
            const allPlaylists = [...owned, ...saved];
            allPlaylists.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            return okResponse(
                res,
                'Successfully fetched playlists',
                formatItems(allPlaylists, [
                    '_id',
                    'name',
                    'owner',
                    'images',
                    'description',
                    'isPublic',
                    'createdAt',
                    'trackIds',
                    'isOwner',
                ]),
            );
        } catch (err) {
            console.error(err);
            return serverErrorResponse(res);
        }
    };

    getFavoritePlaylistIds = async (req, res) => {
        const userId = req.user._id;
        try {
            const favorite = await Playlist.findOne({ owner: userId, type: 'favorite' })
                .select('tracks.track -_id')
                .lean();

            if (!favorite) {
                return okResponse(res, 'No favorite playlist', []);
            }

            // ✅ Chỉ lấy mảng id track
            const trackIds = favorite.tracks.map((item) => item.track.toString());

            return okResponse(res, 'Favorite track IDs retrieved successfully', trackIds);
        } catch (error) {
            console.error('[getFavoritePlaylistIds] Error:', error);
            return serverErrorResponse(res, 'Failed to get favorite playlist');
        }
    };

    getPlaylistById = async (req, res) => {
        try {
            const userId = req.user._id;
            const playlistId = req.params.id;

            let query;

            if (playlistId === 'favorite') {
                query = { owner: userId, type: 'favorite' };
            } else {
                query = { _id: playlistId };
            }

            const playlist = await Playlist.findOne(query)
                .select('_id name description type owner tracks images')
                .populate({
                    path: 'tracks.track',
                    select: '_id name artists album',
                    populate: {
                        path: 'album',
                        select: '_id name images',
                    },
                })
                .populate({
                    path: 'owner',
                    select: '_id lastName firstName avatarUrl',
                })
                .lean();

            if (!playlist) {
                return notFoundResponse(res, 'Playlist not found');
            }

            return okResponse(res, 'Playlist retrieved successfully', playlist);
        } catch (error) {
            console.error('[getPlaylistById] Error:', error);
            return serverErrorResponse(res, 'Failed to get playlist');
        }
    };

    addTrackToPlaylist = async (req, res) => {
        try {
            const playlistId = req.params.id;
            const { songId } = req.body;

            if (!playlistId || !songId) {
                return badRequestResponse(res, 'Playlist ID and Song ID are required');
            }

            // 🔒 Tìm playlist và kiểm tra quyền sở hữu
            const playlist = await Playlist.findById(playlistId);
            if (!playlist) {
                return notFoundResponse(res, 'Playlist not found');
            }
            if (playlist.owner.toString() !== req.user._id.toString()) {
                return forbiddenResponse(res, 'You do not own this playlist');
            }

            // 🎵 Tìm bài hát
            const song = await Song.findById(songId);
            if (!song || !song.isReady) {
                return notFoundResponse(res, 'Song not found or not ready');
            }

            // 🔁 Kiểm tra xem đã có bài hát trong playlist chưa
            const exists = playlist.tracks.some((t) => t.track.toString() === songId);
            if (exists) {
                return badRequestResponse(res, 'Song already in playlist');
            }

            // ➕ Thêm bài hát vào playlist
            playlist.tracks.push({
                track: songId,
                addedAt: Date.now(),
            });

            await playlist.save();

            return okResponse(res, 'Added success');
        } catch (error) {
            console.error('[addTrackToPlaylist] Error:', error);
            return serverErrorResponse(res, 'Failed to add song to playlist');
        }
    };

    removeTrackFromPlaylist = async (req, res) => {
        try {
            const playlistId = req.params.id;
            const { songId } = req.body;

            console.log(playlistId);

            if (!playlistId || !songId) {
                return badRequestResponse(res, 'Playlist ID and Song ID are required');
            }

            // 🔒 Tìm playlist và kiểm tra quyền sở hữu
            const playlist = await Playlist.findById(playlistId);
            if (!playlist) {
                return notFoundResponse(res, 'Playlist not found');
            }
            if (playlist.owner.toString() !== req.user._id.toString()) {
                return forbiddenResponse(res, 'You do not own this playlist');
            }

            // 🎵 Kiểm tra xem bài hát có trong playlist không
            const index = playlist.tracks.findIndex((t) => t.track.toString() === songId);
            if (index === -1) {
                return notFoundResponse(res, 'Song not found in playlist');
            }

            // ➖ Xóa bài hát khỏi playlist
            playlist.tracks.splice(index, 1);

            await playlist.save();

            return okResponse(res, 'Removed success');
        } catch (error) {
            console.error('[removeTrackFromPlaylist] Error:', error);
            return serverErrorResponse(res, 'Failed to remove song from playlist');
        }
    };
}

export default new playlistController();
