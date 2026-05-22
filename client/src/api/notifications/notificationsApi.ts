import axiosMainApi from '../user/axiosMainApi';

const notificationsApi = {
    getAllNotifications: () => axiosMainApi.get('/notifications/get/all'),
};

export default notificationsApi;
