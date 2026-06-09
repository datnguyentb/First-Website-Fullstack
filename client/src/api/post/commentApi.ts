import { CreateCommentInput } from '~/types/Comment/comment';
import axiosMainApi from '../user/axiosMainApi';

const commentApi = {
    getAllComments: (postId: number) => axiosMainApi.get('/comments/get/all', { params: { postId } }),

    addComment: (data: CreateCommentInput) => axiosMainApi.post('/comments/add', data),

    deleteComment: (id: number) => axiosMainApi.delete(`/comments/delete/${id}`),
};

export default commentApi;
