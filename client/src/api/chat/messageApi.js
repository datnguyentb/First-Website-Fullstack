// src/api/userApi.js
import axiosMainApi from '../user/axiosMainApi';

const messageApi = {
    sendMessage: (conversationId) => axiosMainApi.post(`/api/chat/message/send/${conversationId}`),
    getMessages: (conversationId) => axiosMainApi.get(`/api/chat/message/get/${conversationId}`),
};

export default messageApi;
