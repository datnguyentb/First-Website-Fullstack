import axiosMainApi from '../user/axiosMainApi';

const roomApi = {
    createRoom: (data: any) => axiosMainApi.post('/api/co_listening/room/create', data),
};

export default roomApi;
