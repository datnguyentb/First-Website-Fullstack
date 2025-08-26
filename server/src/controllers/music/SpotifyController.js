// controllers/music/spotifyController.js
import fetch from 'node-fetch';
import { getAccessToken } from '../../utils/spotify.js';
import { joinIds } from '../../helper/joinIds.js';
import { splitIds } from '../../helper/splitIds.js';
import { okResponse, notFoundResponse, badRequestResponse, serverErrorResponse } from '../../utils/responseHelper.js';

class SpotifyController {
    // Get single track information
    getTrackInfo = async (req, res) => {
        try {
            const { id } = req.params;
            const token = await getAccessToken();

            const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) return notFoundResponse(res, 'Unable to retrieve track information');

            const data = await response.json();
            return okResponse(res, 'Track information retrieved successfully', data);
        } catch (error) {
            console.error('Error getTrackInfo:', error);
            return serverErrorResponse(res);
        }
    };

    // Search Spotify
    searchSpotify = async (req, res) => {
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
    };

    // Get album information
    getAlbumInfo = async (req, res) => {
        try {
            const { id } = req.params;
            const token = await getAccessToken();

            const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) return notFoundResponse(res, 'Unable to retrieve album information');

            const data = await response.json();
            return okResponse(res, 'Album information retrieved successfully', data);
        } catch (error) {
            console.error('Error getAlbumInfo:', error);
            return serverErrorResponse(res);
        }
    };

    // Get artist information
    getArtistInfo = async (req, res) => {
        try {
            const { id } = req.params;
            const token = await getAccessToken();

            const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) return notFoundResponse(res, 'Unable to retrieve artist information');

            const data = await response.json();
            return okResponse(res, 'Artist information retrieved successfully', data);
        } catch (error) {
            console.error('Error getArtistInfo:', error);
            return serverErrorResponse(res);
        }
    };

    // Get top tracks of an artist
    getArtistTopTracks = async (req, res) => {
        try {
            const { id } = req.params;
            const token = await getAccessToken();

            const response = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=VN`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) return notFoundResponse(res, 'Unable to retrieve artist top tracks');

            const data = await response.json();
            return okResponse(res, 'Artist top tracks retrieved successfully', data.tracks);
        } catch (error) {
            console.error('Error getArtistTopTracks:', error);
            return serverErrorResponse(res);
        }
    };

    // Get available genres
    getGenres = async (req, res) => {
        try {
            const token = await getAccessToken();

            const response = await fetch(`https://api.spotify.com/v1/recommendations/available-genre-seeds`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) return notFoundResponse(res, 'Unable to retrieve genres');

            const data = await response.json();
            return okResponse(res, 'Genres list retrieved successfully', data);
        } catch (error) {
            console.error('Error getGenres:', error);
            return serverErrorResponse(res);
        }
    };
}

export default new SpotifyController();
