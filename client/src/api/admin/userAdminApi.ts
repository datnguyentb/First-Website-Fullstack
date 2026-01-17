import axiosMainAdminApi from './axiosMainAdminApi';

const userAdminApi = {
    getUserNumber: () => axiosMainAdminApi.get('/admin/user/get_user_number'),
    getAllUsers: () => axiosMainAdminApi.get('/admin/user/get_all_users'),
};

export default userAdminApi;
