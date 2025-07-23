import axiosMainAdminApi from './axiosMainAdminApi';

const userAdminApi = {
    getUserNumber: () => axiosMainAdminApi.get('/admin/user/get_user_number'),
};

export default userAdminApi;
