// src/api/userApi.js
import axiosMainApi from './axiosMainApi';

const messageApi = {
    sendMessage: (conversationId) => axiosMainApi.post(`/api/message/send/${conversationId}`),
};

export default messageApi;
