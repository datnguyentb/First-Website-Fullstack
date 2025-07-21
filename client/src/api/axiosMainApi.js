import axios from 'axios';
import baseUrl from '~/helper/baseUrl';

const axiosMainApi = axios.create({
    baseURL: baseUrl(),
});

axiosMainApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosMainApi;
