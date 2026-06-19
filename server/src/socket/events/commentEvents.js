// backend/socket/commentEvents.js

import { canAccessPost } from '../../middleware/hook/canAccessPost.js';
import postCommentService from '../../services/comment/postCommentService.js';

const commentEvents = (socket) => {
    const userId = socket.user._id;

    // Join vào phòng comment của một bài viết cụ thể
    socket.on('joinPostComments', async (postId) => {
        // Logic check quyền xem bài viết/comment tương tự như chat
        const allowed = await canAccessPost(postId, userId);
        if (!allowed) return socket.emit('error', 'Không có quyền xem bình luận bài viết này.');
        socket.join(`post_comments:${postId}`); // Đặt tên room có prefix để tránh trùng với id chat
    });

    // Leave phòng comment
    socket.on('leavePostComments', (postId) => {
        if (!postId) return;
        socket.leave(`post_comments:${postId}`);
    });

    // Xử lý sự kiện gửi bình luận
    socket.on('sendComment', async (postId, commentData) => {
        const allowed = await canAccessPost(postId, userId);
        if (!allowed) return socket.emit('error', 'Không có quyền gửi bình luận này.');

        const newComment = {
            post: postId,
            content: commentData.content,
            parentCommentId: commentData.parentCommentId,
            user: userId,
        };

        const savedComment = await postCommentService.createComment(newComment);
        socket.emit(`post_comments:${postId}`, savedComment);
    });
};

export default commentEvents;
