import axios from 'axios';
import baseUrl from '~/helper/baseUrl';

const axiosMainAdminApi = axios.create({
    baseURL: baseUrl(),
});

// Gắn token cho mỗi request
axiosMainAdminApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Bắt lỗi 401 và redirect
axiosMainAdminApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('adminToken'); // xoá token cũ
            window.location.href = '/admin/login'; // redirect sang login
            navigate('/admin/login');
            return Promise.resolve();
        }
        return Promise.reject(error);
    },
);

export default axiosMainAdminApi;
