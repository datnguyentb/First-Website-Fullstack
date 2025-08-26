import axiosMainApi from '../user/axiosMainApi';

const musicPlayerApi = {
    getTracksRecomend: () => axiosMainApi.get('/api/music/tracks/recommend'),
    getListeningHistory: () => axiosMainApi.get('/api/music/listening-history'),
    addTrackToListeningHistory: (trackId) => axiosMainApi.post(`/api/music/listening-history/${trackId}`),
    getTrackUrlById: (trackId) => axiosMainApi.get(`/api/music/track/url/${trackId}`),
};

export default musicPlayerApi;
