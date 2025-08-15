import axiosMainApi from '../user/axiosMainApi';

const spotifyApi = {
    getSeveralTracks: (listId) => axiosMainApi.get(`/api/spotify/tracks/${listId}`),
    searchSpotify: (q, type, limit) =>
        axiosMainApi.get('/api/spotify/search', {
            params: { q, type, limit },
        }),
    getAlbumInfo: (id) => axiosMainApi.get(`/api/spotify/album/${id}`),
    getArtistInfo: (id) => axiosMainApi.get(`/api/spotify/artist/${id}`),
    getArtistTopTracks: (id) => axiosMainApi.get(`/api/spotify/artist/${id}/top-tracks`),
    getGenres: () => axiosMainApi.get('/api/spotify/genres'),
};

export default spotifyApi;
