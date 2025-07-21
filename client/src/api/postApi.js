// src/api/userApi.js
import axiosMainApi from './axiosMainApi';

const postApi = {
    creatPost: (data) => axiosMainApi.post('/posts/create', data),
    getPostAll: () => axiosMainApi.get('/posts/get_all'),
    deletePost: (id) => axiosMainApi.delete(`/posts/delete/${id}`),
    likePost: (id) => axiosMainApi.patch(`/posts/post/like/${id}`),
};

export default postApi;
