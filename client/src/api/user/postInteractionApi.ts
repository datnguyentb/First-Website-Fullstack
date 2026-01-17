import axiosMainApi from './axiosMainApi';

const postInteractionApi = {
    likePost: (postId: string) => axiosMainApi.patch(`/post/interactions/like/${postId}`),
    savePost: (postId: string) => axiosMainApi.put(`/post/interactions/save/${postId}`),
    unsavePost: (postId: string) => axiosMainApi.put(`/post/interactions/unsave/${postId}`),
    hidePost: (postId: string) => axiosMainApi.put(`/post/interactions/hide/${postId}`),
    reportPost: (postId: string, reason: string) => axiosMainApi.put(`/post/interactions/report/${postId}`, { reason }),
};

export default postInteractionApi;
