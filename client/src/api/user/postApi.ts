// src/api/userApi.js
import axiosMainApi from './axiosMainApi';

const postApi = {
    creatPost: (data: FormData) => axiosMainApi.post('/posts/create', data),
    getPostAll: () => axiosMainApi.get('/posts/get_all'),
    deletePost: (id: string) => axiosMainApi.delete(`/posts/delete/${id}`),
    likePost: (id: string) => axiosMainApi.patch(`/posts/post/like/${id}`),
    savePost: (id: string) => axiosMainApi.put(`/posts/post/save/${id}`),
    hidePost: (id: string) => axiosMainApi.put(`/posts/post/hide/${id}`),
    reportPost: (id: string, reason: string) => axiosMainApi.put(`/posts/post/report/${id}`, { reason }),
};

export default postApi;
