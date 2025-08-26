import axiosMainAdminApi from './axiosMainAdminApi';

const musicAdminApi = {
    searchTracks: (q, limit) =>
        axiosMainAdminApi.get('/admin/music/search/tracks', {
            params: { q, limit },
        }),
    addTrack: (id) => axiosMainAdminApi.post(`/admin/music/add/track/${id}`),
    addTrackAudio: (id, file) => axiosMainAdminApi.put(`/admin/music/add/track/audio/${id}`, file),
    getAllTracks: () => axiosMainAdminApi.get('/admin/music/tracks/all'),
    deleteTrack: (id) => axiosMainAdminApi.delete(`/admin/music/delete/${id}`),
};

export default musicAdminApi;
