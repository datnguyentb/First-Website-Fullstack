import User from '../../models/User.js';
import { getAccessToken } from '../../utils/spotify.js';
import {
    okResponse,
    badRequestResponse,
    unauthorizedResponse,
    serverErrorResponse,
} from '../../utils/responseHelper.js';
import { formatItem } from '../../utils/formatter.js';

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
            return serverErrorResponse(res);
        }
    }
}

export default new AdminMusicController();
