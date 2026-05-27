import axiosMainApi from '../user/axiosMainApi';

const notificationsApi = {
    getAllNotifications: () => axiosMainApi.get('/notifications/get/all'),
    markAllAsRead: () => axiosMainApi.post('/notifications/mark-all-as-read'),
};

export default notificationsApi;
