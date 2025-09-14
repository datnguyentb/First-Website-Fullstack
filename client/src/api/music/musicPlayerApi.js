import axiosMainApi from '../user/axiosMainApi';

const musicPlayerApi = {
    getTracksRecomend: () => axiosMainApi.get('/api/music/tracks/recommend'),
    getListeningHistory: () => axiosMainApi.get('/api/music/listening-history'),
    addTrackToListeningHistory: (trackId) => axiosMainApi.post(`/api/music/listening-history/${trackId}`),
    getTrackUrlById: (trackId) => axiosMainApi.get(`/api/music/tracks/url/${trackId}`),
    searchEntities: (q, limit) => axiosMainApi.get(`/api/music/search/${encodeURIComponent(q)}?limit=${limit}`),
    createPlaylist: (data) => axiosMainApi.post('/api/music/playlists/create', data),
    getMyPlaylists: () => axiosMainApi.get('/api/music/playlists/me'),
    deletePlaylist: (id) => axiosMainApi.delete(`/api/music/playlists/delete/${id}`),
    addTrackToFavorite: (id) => axiosMainApi.post(`/api/music/playlists/favorite/add/${id}`),
    removeTrackFromFavorite: (id) => axiosMainApi.delete(`/api/music/playlists/favorite/remove/${id}`),
    getFavoritePlaylistIds: () => axiosMainApi.get('/api/music/playlists/favorite/all'),
    getPlaylistById: (id) => axiosMainApi.get(`/api/music/playlists/${id}`),
    addTrackToPlaylist: (id, songId) =>
        axiosMainApi.patch(`/api/music/playlists/add/${id}/songs`, {
            songId: songId,
        }),
    deleteTrackFromPlaylist: (id, songId) =>
        axiosMainApi.delete(`/api/music/playlists/delete/${id}/songs`, {
            data: { songId },
        }),
};

export default musicPlayerApi;
