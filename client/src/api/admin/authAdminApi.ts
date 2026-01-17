// src/api/authApi.js
import { loginForm } from '~/types/loginFormData';
import axiosMainAdminApi from './axiosMainAdminApi';

const authAdminApi = {
    login: (data: loginForm) => axiosMainAdminApi.post('/admin/auth/login', data),
    checkToken: () => axiosMainAdminApi.get('/admin/auth/check-token'),
    logout: () => {
        localStorage.removeItem('adminToken');
    },
};

export default authAdminApi;
