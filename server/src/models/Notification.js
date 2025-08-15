import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
    senders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    ],
    type: {
        type: String,
        enum: ['mention', 'share', 'message', 'comment', 'reaction', 'group_add', 'group_post'],
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    relatedPostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    groupName: {
        type: String,
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model('Notification', NotificationSchema);
