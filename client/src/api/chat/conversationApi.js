// src/api/userApi.js
import axiosMainApi from '../user/axiosMainApi';

const conversationApi = {
    getOrCreate: (userId) => axiosMainApi.post(`/api/chat/conversations`, { userId }),
    getAll: (params) =>
        axiosMainApi.get('/api/chat/conversations', {
            params,
        }),
};

export default conversationApi;
