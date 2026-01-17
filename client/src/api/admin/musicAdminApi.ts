import axiosMainAdminApi from './axiosMainAdminApi';

const musicAdminApi = {
    searchTracks: (q: string, limit: string | number) =>
        axiosMainAdminApi.get('/admin/music/search/tracks', {
            params: { q, limit },
        }),
    addTrack: (id: string) => axiosMainAdminApi.post(`/admin/music/add/track/${id}`),
    addTrackAudio: (id: string, file: FormData) => axiosMainAdminApi.put(`/admin/music/add/track/audio/${id}`, file),
    getAllTracks: () => axiosMainAdminApi.get('/admin/music/tracks/all'),
    deleteTrack: (id: string) => axiosMainAdminApi.delete(`/admin/music/delete/${id}`),
};

export default musicAdminApi;
