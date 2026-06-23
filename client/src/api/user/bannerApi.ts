import axiosMainApi from './axiosMainApi';

const bannerApi = {
    getHomeBanners: () => axiosMainApi.get('/api/banners/home'),
    getAuthBanners: () => axiosMainApi.get('/api/banners/auth'),
};

export default bannerApi;
