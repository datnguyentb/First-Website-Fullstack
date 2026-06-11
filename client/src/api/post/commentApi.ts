import { CreateCommentInput } from '~/types/Comment/comment';
import axiosMainApi from '../user/axiosMainApi';

const commentApi = {
    getAllComments: (id: string) => axiosMainApi.get('/api/post/comments/get/all', { params: { id } }),

    addComment: (data: CreateCommentInput) => axiosMainApi.post('/api/post/comments/add', data),

    deleteComment: (id: string) => axiosMainApi.delete(`/api/post/comments/delete/${id}`),
};

export default commentApi;
