import axios from 'axios';

const axiosOther = axios.create({
    baseURL: import.meta.env.VITE_OTHER_API_URL,
    headers: { 'Content-Type': 'application/json' },
});

export default axiosOther;
