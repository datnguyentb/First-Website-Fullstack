import axiosMainAdminApi from './axiosMainAdminApi';

const postAdminApi = {
    getPostsNumber: () => axiosMainAdminApi.get('/admin/post/get_posts_number'),
    getAllPost: () => axiosMainAdminApi.get('/admin/post/get_all_posts'),
    softDelete: (id: string, reason: string) =>
        axiosMainAdminApi.delete(`/admin/post/delete/${id}`, {
            data: { reason },
        }),
    restorePost: (id: string) => axiosMainAdminApi.patch(`/admin/post/restore/${id}`),
    forceDelete: (id: string) => axiosMainAdminApi.delete(`/admin/post/force/${id}`),
};

export default postAdminApi;
