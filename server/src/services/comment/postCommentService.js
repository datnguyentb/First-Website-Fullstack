import Comment from '../../models/Comment.js';

const createComment = async (commentData) => {
    try {
        const comment = await Comment.create(commentData);
        return comment;
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
};

export default {
    createComment,
};
