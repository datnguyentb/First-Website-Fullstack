import mongoose from 'mongoose';

const HiddenPostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    hiddenAt: {
        type: Date,
        default: Date.now,
    },
});

// ✅ Đảm bảo 1 user chỉ ẩn 1 post 1 lần duy nhất
HiddenPostSchema.index({ user: 1, post: 1 }, { unique: true });

export default mongoose.model('HiddenPost', HiddenPostSchema);
