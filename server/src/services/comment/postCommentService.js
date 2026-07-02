import Comment from '../../models/Comment.js';
import { canAccessPost } from '../../middleware/hook/canAccessPost.js';
import PostCommentRepository from '../../repositories/postCommentRepository.js';
import { formatNewComment } from '../../utils/newCommentFormatter.js';

const sendComment = async (postId, userId, commentData, socket) => {
    //new code
    const allowed = await canAccessPost(postId, userId);

    if (!allowed) {
        throw new Error('You do not have permission to send comments on this post.');
    }

    const comment = formatNewComment({
        post: postId,
        content: commentData.content,
        parentCommentId: commentData.parentCommentId,
        user: userId,
    });

    const newComment = await PostCommentRepository.create(comment);
    if (!newComment) {
        throw new Error('Failed to save comment.');
    }
    socket.emit(`post_comments:${postId}`, newComment);

    return newComment;
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
    sendComment,
    getAllComments,
};
