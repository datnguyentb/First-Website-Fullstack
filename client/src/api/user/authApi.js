// src/api/authApi.js
import axiosMainApi from './axiosMainApi';

const authApi = {
    login: (data) => axiosMainApi.post('/auth/login', data),
    register: (data) => axiosMainApi.post('/auth/register', data),
    checkToken: () => axiosMainApi.get('/auth/check-token'),
    logout: () => {
        localStorage.removeItem('token');
    },
};

export default authApi;
