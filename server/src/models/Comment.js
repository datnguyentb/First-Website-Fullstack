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
        parent_comment_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            default: null,
        },
    },
    {
        timestamps: true,
    },
);

// ✅ Lập chỉ mục để truy vấn con theo cha nhanh hơn
commentSchema.index({
    post: 1,
    parent_comment_id: 1,
    createdAt: 1,
});

// 🚫 Ẩn __v khi toJSON
commentSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    },
});

export default mongoose.model('Comment', commentSchema);
