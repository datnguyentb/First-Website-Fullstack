// models/Post.js
import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const postSchema = new mongoose.Schema(
    {
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            trim: true,
        },
        images: {
            type: [String],
            default: [],
        },
        video: {
            type: String,
            default: '',
        },
        privacy: {
            type: String,
            enum: ['public', 'private', 'friends'],
            default: 'public',
        },
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        location: {
            type: String,
            default: '',
        },
        sharedFromPostId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            default: null,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        likeCount: {
            type: Number,
            default: 0,
        },
        violationReason: {
            type: String,
            default: null,
        },
        deletedReason: {
            type: String,
            default: '',
        },
        deletedByAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        reportedBy: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                reportedAt: {
                    type: Date,
                    default: Date.now,
                },
                reason: {
                    type: String,
                },
            },
        ],
        commentCount: {
            type: Number,
            default: 0,
        },
        isEdited: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

// Kích hoạt plugin
postSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

// 🔍 Tạo index cho tìm kiếm nhanh
postSchema.index({ content: 'text', location: 'text' });

// 🚫 Ẩn các trường không cần khi toJSON
postSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    },
});

// ✅ Xuất model
export default mongoose.model('Post', postSchema);
