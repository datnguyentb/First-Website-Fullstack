import Comment from '../../models/Comment.js';
import { formatNewComment } from '../../utils/newCommentFormatter.js';

const createComment = async (commentData) => {
    const newCommentData = formatNewComment(commentData);
    try {
        let comment = await Comment.create(newCommentData);

        comment = await comment.populate('user', 'firstName lastName avatar');

        return comment.toObject();
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
