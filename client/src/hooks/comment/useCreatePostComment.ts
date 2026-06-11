import commentApi from '~/api/post/commentApi';
import { CreateCommentInput } from '~/types/Comment/comment';

export const useCreatePostComment = () => {
    const createComment = async (commentData: CreateCommentInput) => {
        try {
            const res = await commentApi.addComment(commentData);

            console.log('Comment created successfully:', res);
        } catch (error) {
            console.error('Error creating comment:', error);
            throw error;
        }
    };

    return { createComment };
};
