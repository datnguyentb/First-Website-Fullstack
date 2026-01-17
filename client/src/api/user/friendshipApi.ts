// src/api/userApi.js
import axiosMainApi from './axiosMainApi';

const postApi = {
    sendFriendRequest: (userId: string) => axiosMainApi.post(`/api/friends/friendship/request/${userId}`),
    unfollowUser: (userId: string) => axiosMainApi.delete(`/api/friends/friendship/unfollow/${userId}`),
    getFriendshipStatus: (userId: string) => axiosMainApi.get(`/api/friends/friendship/status/${userId}`),
};

export default postApi;
