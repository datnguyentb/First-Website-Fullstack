// src/api/userApi.js
import axiosMainApi from './axiosMainApi';

const postApi = {
    sendFriendRequest: (userId) => axiosMainApi.post(`/api/friends/request/${userId}`),
    unfollowUser: (userId) => axiosMainApi.delete(`/api/friends/unfollow/${userId}`),
    getFriendshipStatus: (userId) => axiosMainApi.get(`/api/friends/friendship/status/${userId}`),
};

export default postApi;
