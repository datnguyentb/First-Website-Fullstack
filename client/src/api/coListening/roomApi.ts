import axiosMainApi from '../user/axiosMainApi';

const roomApi = {
    createRoom: (data: any) => axiosMainApi.post('/api/co_listening/room/create', data),
    getAllRoom: () => axiosMainApi.get('/api/co_listening/room/get_all'),
};

export default roomApi;
