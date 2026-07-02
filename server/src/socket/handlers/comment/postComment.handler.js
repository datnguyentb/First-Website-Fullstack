import { canAccessPost } from '../../../middleware/hook/canAccessPost.js';
import postCommentService from '../../../services/comment/postCommentService.js';

const postCommentHandler = (socket) => {
    const userId = socket.user._id;

    // Join room comment
    socket.on('joinPostComments', async (postId) => {
        // check access post
        const allowed = await canAccessPost(postId, userId);
        if (!allowed) return socket.emit('error', 'You do not have permission to view comments on this post.');
        socket.join(`post_comments:${postId}`);
    });

    // Leave room comment
    socket.on('leavePostComments', (postId) => {
        if (!postId) return;
        socket.leave(`post_comments:${postId}`);
    });

    // Handle sending comment
    socket.on('sendComment', async (postId, commentData) => {
        try {
            await postCommentService.sendComment(postId, userId, commentData, socket);
        } catch (err) {
            socket.emit('commentError', err.message);
        }
    });
};

export default postCommentHandler;
