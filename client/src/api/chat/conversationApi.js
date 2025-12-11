// src/api/userApi.js
import axiosMainApi from '../user/axiosMainApi';

const conversationApi = {
    getOrCreate: (userId) => axiosMainApi.post(`/api/chat/conversations`, { userId }),
    getAllConversations: () => axiosMainApi.get(`/api/chat/conversations`),
};

export default conversationApi;
