import axiosMainApi from './axiosMainApi';

const postInteractionApi = {
    likePost: (postId) => axiosMainApi.patch(`/posts/interact/like/${postId}`),
    savePost: (postId) => axiosMainApi.put(`/posts/interact/save/${postId}`),
    unsavePost: (postId) => axiosMainApi.put(`/posts/interact/unsave/${postId}`),
    hidePost: (postId) => axiosMainApi.put(`/posts/interact/hide/${postId}`),
    reportPost: (postId, reason) => axiosMainApi.put(`/posts/interact/report/${postId}`, { reason }),
};

export default postInteractionApi;
