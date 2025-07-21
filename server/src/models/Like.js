import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        post_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },
    },
    {
        timestamps: true, // createdAt & updatedAt
    },
);

// ✅ Một người chỉ được like 1 bài 1 lần
likeSchema.index({ user_id: 1, post_id: 1 }, { unique: true });

// 🚫 Ẩn __v khi toJSON
likeSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    },
});

export default mongoose.model('Like', likeSchema);
