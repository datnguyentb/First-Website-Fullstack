import { CreateCommentInput } from '~/types/Comment/comment';
import axiosMainApi from '../user/axiosMainApi';

const commentApi = {
    getAllComments: (postId: number) => axiosMainApi.get('/api/post/comments/get/all', { params: { postId } }),

    addComment: (data: CreateCommentInput) => axiosMainApi.post('/api/post/comments/add', data),

    deleteComment: (id: number) => axiosMainApi.delete(`/api/post/comments/delete/${id}`),
};

export default commentApi;
