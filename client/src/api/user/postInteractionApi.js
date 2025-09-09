import axiosMainApi from './axiosMainApi';

const postInteractionApi = {
    likePost: (postId) => axiosMainApi.patch(`/posts/interactions/like/${postId}`),
    savePost: (postId) => axiosMainApi.put(`/posts/interactions/save/${postId}`),
    unsavePost: (postId) => axiosMainApi.put(`/posts/interactions/unsave/${postId}`),
    hidePost: (postId) => axiosMainApi.put(`/posts/interactions/hide/${postId}`),
    reportPost: (postId, reason) => axiosMainApi.put(`/posts/interactions/report/${postId}`, { reason }),
};

export default postInteractionApi;
