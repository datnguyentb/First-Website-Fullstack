import { getAccessToken } from '../../utils/spotify.js';
import {
    okResponse,
    badRequestResponse,
    serverErrorResponse,
    notFoundResponse,
    createdResponse,
} from '../../utils/responseHelper.js';
import { formatItem } from '../../utils/formatter.js';
import Songs from '../../models/Songs.js';

class AdminMusicController {
    async searchTracksAndPlaylist(req, res) {
        try {
            const { q, type, limit } = req.query;
            if (!q) return badRequestResponse(res, 'Search keyword is required');

            const token = await getAccessToken();
            let typeSearch = type || 'album,track,artist';

            let url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=${encodeURIComponent(
                typeSearch,
            )}`;
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
            const { id, type, name, info } = req.query;
            const spotifyId = id;
            const createdBy = req.user._id;
            if (!id) {
                return badRequestResponse(res, 'Missing Id');
            }

            if (type != 'track' && type != 'playlist') {
                return badRequestResponse(res, 'Type is incorrect');
            }

            // kiểm tra tồn tại
            const existing = await Songs.findOne({ spotifyId });
            if (existing) {
                return badRequestResponse(res, 'Already exists');
            }

            //tạo mới
            const newTrack = await Songs.create({
                spotifyId,
                createdBy,
                type,
                name,
                info,
            });

            return createdResponse(
                res,
                'Added successfully',
                formatItem(newTrack, ['spotifyId', 'name', 'info', 'type']),
            );
        } catch (err) {
            console.error('Error add:', err);
            return serverErrorResponse(res, err.message);
        }
    }

    async getTracksAndPlaylist(req, res) {
        try {
            const items = await Songs.find({}).select('spotifyId name info type -_id').sort({ createdAt: -1 }).lean();

            return okResponse(res, '', items);
        } catch (err) {
            console.error('Error getTracksAndPlaylist:', err);
            return serverErrorResponse(res, err.message);
        }
    }

    async removeTrackAndPlaylist(req, res) {
        try {
            const { spotifyId } = req.params;

            if (!spotifyId) {
                return badRequestResponse(res, 'Missing Id');
            }
            const item = await Songs.findOne({ spotifyId });

            if (!item) {
                return badRequestResponse(res, 'Item not found');
            }

            await Songs.deleteOne({ spotifyId });

            return okResponse(res, 'Item removed successfully');
        } catch (error) {
            console.error(error);
            return serverErrorResponse(res, err.message);
        }
    }
}

export default new AdminMusicController();
