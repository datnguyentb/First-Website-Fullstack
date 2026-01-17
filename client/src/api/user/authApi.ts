// src/api/authApi.js
import axiosMainApi from './axiosMainApi';

const authApi = {
    login: (data: FormData) => axiosMainApi.post('/auth/login', data),
    register: (data: FormData) => axiosMainApi.post('/auth/register', data),
    checkToken: () => axiosMainApi.get('/auth/check-token'),
    logout: () => {
        localStorage.removeItem('token');
    },
};

export default authApi;
