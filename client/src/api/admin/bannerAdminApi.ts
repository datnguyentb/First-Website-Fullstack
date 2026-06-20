import axiosMainAdminApi from './axiosMainAdminApi';

const bannerAdminApi = {
    createBanner: (formData: FormData) => axiosMainAdminApi.post('/admin/banner/create', formData),
    updateBanner: (formData: FormData, id: string) => axiosMainAdminApi.put(`/admin/banner/update/${id}`, formData),
};

export default bannerAdminApi;
