import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        parenCommentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            default: null,
        },
        // ➕ Thêm mảng chứa danh sách các user đã thích bình luận này
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        timestamps: true,
    },
);

// ⚡ Lập chỉ mục giúp tăng tốc truy vấn hệ thống bình luận đa cấp
commentSchema.index({
    post: 1,
    parent_comment_id: 1,
    createdAt: 1,
});

// 🔢 Tạo một thuộc tính ảo (Virtual field) để lấy tổng số lượt like mà không cần lưu số đếm vào DB
commentSchema.virtual('likeCount').get(function () {
    return this.likes ? this.likes.length : 0;
});

// Config để thuộc tính ảo 'likeCount' tự động xuất hiện khi API trả kết quả về dạng JSON
commentSchema.set('toJSON', {
    virtuals: true, // Kích hoạt hiển thị virtuals
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    },
});

export default mongoose.model('Comment', commentSchema);
