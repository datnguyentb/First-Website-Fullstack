// src/api/userApi.js
import axiosMainApi from './axiosMainApi';

const userApi = {
    getMeInfor: () => axiosMainApi.get(`/user/me/less`),
    getMe: () => axiosMainApi.get('/user/me/all'),
    getUserById: (id: string) => axiosMainApi.get(`/user/${id}`),
    updateAvatar: (data: FormData) => axiosMainApi.put(`/user/update/avatar`, data),
    updateUserInfo: (data: FormData) => axiosMainApi.put('user/update/me', data),
};

export default userApi;
