// src/api/authApi.js
import axiosMainAdminApi from './axiosMainAdminApi';

const authAdminApi = {
    login: (data) => axiosMainAdminApi.post('/admin/auth/login', data),
    checkToken: () => axiosMainAdminApi.get('/admin/auth/check-token'),
    logout: () => {
        localStorage.removeItem('adminToken');
    },
};

export default authAdminApi;
