import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
    {
        // 👥 Thành viên
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
        ],

        // 🗂 Loại cuộc trò chuyện
        type: {
            type: String,
            enum: ['private', 'group'],
            default: 'private',
        },

        // 🏷 Thông tin nhóm
        groupName: { type: String, trim: true },
        groupAvatar: { type: String },
        admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

        // 🎨 Tuỳ chỉnh hiển thị
        theme: {
            name: { type: String, default: 'default' },
            color: { type: String, default: '#0084ff' },
        },
        nicknames: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                nickname: { type: String, trim: true, default: '' },
            },
        ],
        customEmoji: { type: String, default: 'like' },

        // 💬 Tin nhắn cuối
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        },

        unreadCount: {
            type: Map,
            of: Number,
            default: {},
        },

        // 🕓 Nhật ký thay đổi
        activities: [
            {
                action: String, // e.g. 'change_theme', 'change_nickname'
                user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                detail: Object, // { old: '', new: '' }
                createdAt: { type: Date, default: Date.now },
            },
        ],

        // 🗑 Xóa cuộc trò chuyện cho từng người
        deletedFor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true },
);

export default mongoose.model('Conversation', conversationSchema);
