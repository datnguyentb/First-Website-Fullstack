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

const getAllComments = async (id) => {
    if (!id) {
        throw new Error('Post ID is required');
    }
    try {
        const comments = await Comment.find({ post: id }).populate('user', 'firstName lastName avatar').lean();
        return comments;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

export default {
    createComment,
    getAllComments,
};
