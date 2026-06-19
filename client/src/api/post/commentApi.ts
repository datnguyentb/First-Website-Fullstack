import { CreateCommentInput } from '~/types/Comment/comment';
import axiosMainApi from '../user/axiosMainApi';

const commentApi = {
    getAllComments: (id: string) => axiosMainApi.get('/api/post/comments/get/all', { params: { id } }),

    deleteComment: (id: string) => axiosMainApi.delete(`/api/post/comments/delete/${id}`),
};

export default commentApi;
