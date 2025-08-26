import axios from 'axios';
import baseUrl from '~/helper/baseUrl';

const axiosMainApi = axios.create({
    baseURL: baseUrl(),
});

// Gắn token cho mỗi request
axiosMainApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Bắt lỗi 401 và redirect
axiosMainApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            navigate('/admin/login');
            return Promise.resolve();
        }
        return Promise.reject(error);
    },
);

export default axiosMainApi;
