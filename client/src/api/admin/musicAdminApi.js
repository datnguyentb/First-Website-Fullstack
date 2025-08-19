import axiosMainAdminApi from './axiosMainAdminApi';

const musicAdminApi = {
    searchSpotify: (q, type, limit) =>
        axiosMainAdminApi.get('/admin/music/search', {
            params: { q, type, limit },
        }),
    addTrackAndPlaylist: (id, type, name, info) =>
        axiosMainAdminApi.post(`/admin/music/add`, null, {
            params: { id, type, name, info },
        }),
    getTrackAndPlaylist: () => axiosMainAdminApi.get('/admin/music/all'),
    deleteTrackAndPlaylist: (id) => axiosMainAdminApi.delete(`/admin/music/delete/${id}`),
};

export default musicAdminApi;
