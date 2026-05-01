import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
    {
        // 👤 Người tạo hành động
        actors: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
        ],

        // 🧠 Nhóm logic
        category: {
            type: String,
            enum: ['SOCIAL', 'CHAT', 'SYSTEM', 'MUSIC'],
            required: true,
        },

        // ⚡ Hành động cụ thể
        action: {
            type: String,
            enum: [
                'LIKE',
                'COMMENT',
                'REPLY',
                'FOLLOW',
                'FRIEND_REQUEST',
                'FRIEND_ACCEPTED',
                'MESSAGE',
                'REPORT',
                'MENTION',
                'SHARE',
                'MUSIC_INVITE',
            ],
            required: true,
        },

        // 📝 Nội dung hiển thị
        title: String,
        content: {
            type: String,
            required: true,
        },

        // 🎯 Target (deep link)
        target: {
            type: {
                type: String,
                enum: ['POST', 'COMMENT', 'CONVERSATION', 'PROFILE', 'MUSIC_ROOM'],
                required: true,
            },
            targetId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
        },

        // 💬 Dùng riêng cho chat
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation',
        },

        // 👤 Người nhận
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },

        // 📊 Trạng thái
        isRead: {
            type: Boolean,
            default: false,
        },
        isSeen: {
            type: Boolean,
            default: false,
        },

        // ⚠️ Độ ưu tiên
        priority: {
            type: String,
            enum: ['HIGH', 'NORMAL', 'LOW'],
            default: 'NORMAL',
        },

        // 🧩 Metadata mở rộng
        meta: {
            type: Map,
            of: mongoose.Schema.Types.Mixed,
        },
    },
    { timestamps: true },
);

export default mongoose.model('Notification', NotificationSchema);
