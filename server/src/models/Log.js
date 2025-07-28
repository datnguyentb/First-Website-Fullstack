// models/Log.js
import mongoose from 'mongoose';

const logSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['delete', 'restore', 'force-delete'],
            required: true,
        },
        target: {
            type: String, // Ví dụ: 'Post'
            required: true,
        },
        targetId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        actionBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        reason: {
            type: String, // chỉ cần nếu là delete hoặc force-delete
            default: '',
        },
        time: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true },
);

export default mongoose.model('Log', logSchema);
