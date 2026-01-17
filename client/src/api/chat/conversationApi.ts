// src/api/userApi.js
import axiosMainApi from '../user/axiosMainApi';

const conversationApi = {
    getOrCreate: (userId: string) => axiosMainApi.post(`/api/chat/conversations`, { userId }),
    getAll: (params: any) =>
        axiosMainApi.get('/api/chat/conversations', {
            params,
        }),
    getDetail: (conversationId: string) => axiosMainApi.get(`/api/chat/conversations/${conversationId}`),
};

export default conversationApi;
