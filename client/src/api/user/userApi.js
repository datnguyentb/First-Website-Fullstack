// src/api/userApi.js
import axiosMainApi from './axiosMainApi';

const userApi = {
    getAllUsers: () => axiosMainApi.get('/users'),
    getUserByIdAll: () => axiosMainApi.get('/user/me'),
    getUserById: (id) => axiosMainApi.get(`/user/${id}`),
    getMe: () => axiosMainApi.get('/user/me'),
    updateAvatar: (data) => axiosMainApi.put(`/user/update/avatar`, data),
    deleteUser: (id) => axiosMainApi.delete(`/users/${id}`),
    updateUserInfo: (data) => axiosMainApi.put('user/update/me', data),
};

export default userApi;
