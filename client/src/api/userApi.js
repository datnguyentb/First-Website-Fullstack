// src/api/userApi.js
import axiosMainApi from './axiosMainApi';

const userApi = {
    getAllUsers: () => axiosMainApi.get('/users'),
    getUserByIdAll: () => axiosMainApi.get('/user/me'),
    getUserById: (id) => axiosMainApi.get(`/user/${id}`),
    updateUser: (data) => axiosMainApi.put(`/user/update`, data),
    deleteUser: (id) => axiosMainApi.delete(`/users/${id}`),
};

export default userApi;
