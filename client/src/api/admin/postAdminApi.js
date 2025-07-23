import axiosMainAdminApi from './axiosMainAdminApi';

const postAdminApi = {
    getPostsNumber: () => axiosMainAdminApi.get('/admin/post/get_posts_number'),
    getAllPost: () => axiosMainAdminApi.get('/admin/post/get_all_posts'),
};

export default postAdminApi;
