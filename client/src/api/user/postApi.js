// src/api/userApi.js
import axiosMainApi from './axiosMainApi';

const postApi = {
    creatPost: (data) => axiosMainApi.post('/posts/create', data),
    getPostAll: () => axiosMainApi.get('/posts/get_all'),
    deletePost: (id) => axiosMainApi.delete(`/posts/delete/${id}`),
    likePost: (id) => axiosMainApi.patch(`/posts/post/like/${id}`),
    savePost: (id) => axiosMainApi.put(`/posts/post/save/${id}`),
    hidePost: (id) => axiosMainApi.put(`/posts/post/hide/${id}`),
    reportPost: (id, reason) => axiosMainApi.put(`/posts/post/report/${id}`, { reason }),
};

export default postApi;
