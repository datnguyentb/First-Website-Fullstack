// src/api/userApi.js
import axiosMainApi from './axiosMainApi';

const userApi = {
    getAllUsers: () => axiosMainApi.get('/users'),
    getUserById: (id) => axiosMainApi.get(`/user/${id}`),
    updateUser: (id, data) => axiosMainApi.put(`/users/${id}`, data),
    deleteUser: (id) => axiosMainApi.delete(`/users/${id}`),
};

export default userApi;
