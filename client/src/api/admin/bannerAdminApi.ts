import axiosMainAdminApi from './axiosMainAdminApi';

const bannerAdminApi = {
    createBanner: (formData: FormData) => axiosMainAdminApi.post('/admin/banner/create', formData),
    updateBanner: (formData: FormData) => axiosMainAdminApi.put('/admin/banner/update', formData),
    getAllBanner: () => axiosMainAdminApi.get('/admin/banner/get_all'),
    deleteBanner: (id: string) => axiosMainAdminApi.delete(`/admin/banner/${id}`),
    toggleStatus: (id: string) => axiosMainAdminApi.put(`/admin/banner/${id}/toggle`),
};

export default bannerAdminApi;
