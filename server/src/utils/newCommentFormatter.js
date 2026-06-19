export const formatNewComment = (comment) => {
    if (!comment || typeof comment !== 'object' || Array.isArray(comment)) {
        throw new Error('Dữ liệu bình luận không hợp lệ (Phải là một Object).');
    }

    if (!comment.post) {
        throw new Error('Thiếu thông tin bài viết (postId).');
    }
    if (!comment.content || comment.content.trim() === '') {
        throw new Error('Nội dung bình luận không được để trống.');
    }

    return {
        content: comment.content.trim(),
        post: comment.post,
        parentCommentId: comment.parentCommentId || null,
        user: comment.user,
    };
};
