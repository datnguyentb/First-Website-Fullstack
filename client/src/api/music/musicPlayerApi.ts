import axiosMainApi from '../user/axiosMainApi';

const musicPlayerApi = {
    getTracksRecomend: () => axiosMainApi.get('/api/music/tracks/recommend'),
    getListeningHistory: () => axiosMainApi.get('/api/music/listening-history'),
    addTrackToListeningHistory: (trackId: string) => axiosMainApi.post(`/api/music/listening-history/${trackId}`),
    getTrackUrlById: (trackId: string) => axiosMainApi.get(`/api/music/tracks/url/${trackId}`),
    searchEntities: (q: string, limit: number | string) =>
        axiosMainApi.get(`/api/music/search/${encodeURIComponent(q)}?limit=${limit}`),
    createPlaylist: (data: FormData) => axiosMainApi.post('/api/music/playlists/create', data),
    getMyPlaylists: () => axiosMainApi.get('/api/music/playlists/me'),
    deletePlaylist: (id: string) => axiosMainApi.delete(`/api/music/playlists/delete/${id}`),
    addTrackToFavorite: (id: string) => axiosMainApi.post(`/api/music/playlists/favorite/add/${id}`),
    removeTrackFromFavorite: (id: string) => axiosMainApi.delete(`/api/music/playlists/favorite/remove/${id}`),
    getFavoritePlaylistIds: () => axiosMainApi.get('/api/music/playlists/favorite/all'),
    getPlaylistById: (id: string) => axiosMainApi.get(`/api/music/playlists/${id}`),
    addTrackToPlaylist: (id: string, songId: string) =>
        axiosMainApi.patch(`/api/music/playlists/add/${id}/songs`, {
            songId: songId,
        }),
    deleteTrackFromPlaylist: (id: string, songId: string) =>
        axiosMainApi.delete(`/api/music/playlists/delete/${id}/songs`, {
            data: { songId },
        }),
};

export default musicPlayerApi;
