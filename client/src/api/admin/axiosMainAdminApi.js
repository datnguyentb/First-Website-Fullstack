import axios from 'axios';
import baseUrl from '~/helper/baseUrl';

const axiosMainAdminApi = axios.create({
    baseURL: baseUrl(),
});

axiosMainAdminApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosMainAdminApi;
