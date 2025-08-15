import axiosMainAdminApi from './axiosMainAdminApi';

const musicAdminApi = {
    searchSpotify: (q, type, limit) =>
        axiosMainAdminApi.get('/admin/music/search', {
            params: { q, type, limit },
        }),
};

export default musicAdminApi;
