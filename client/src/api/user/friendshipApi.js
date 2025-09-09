// src/api/userApi.js
import axiosMainApi from './axiosMainApi';

const postApi = {
    sendFriendRequest: (userId) => axiosMainApi.post(`/api/friends/friendship/request/${userId}`),
    unfollowUser: (userId) => axiosMainApi.delete(`/api/friends/friendship/unfollow/${userId}`),
    getFriendshipStatus: (userId) => axiosMainApi.get(`/api/friends/friendship/status/${userId}`),
};

export default postApi;
