// src/api/userApi.js
import axiosMainApi from './axiosMainApi';

const userApi = {
    getAllUsers: () => axiosMainApi.get('/users'),
    getUserByIdAll: () => axiosMainApi.get('/user/me'),
    getMeInfor: () => axiosMainApi.get(`/user/me/less`),
    getMe: () => axiosMainApi.get('/user/me/all'),
    updateAvatar: (data) => axiosMainApi.put(`/user/update/avatar`, data),
    deleteUser: (id) => axiosMainApi.delete(`/users/${id}`),
    updateUserInfo: (data) => axiosMainApi.put('user/update/me', data),
};

export default userApi;
