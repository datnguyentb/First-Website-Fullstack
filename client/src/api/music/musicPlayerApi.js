import axiosMainApi from '../user/axiosMainApi';

const musicPlayerApi = {
    getTracksRecomend: () => axiosMainApi.get('/api/music/tracks/recommend'),
};

export default musicPlayerApi;
