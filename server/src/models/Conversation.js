import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
    {
        // Thành viên tham gia cuộc trò chuyện
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
        ],

        // Loại cuộc trò chuyện
        type: {
            type: String,
            enum: ['private', 'group'],
            default: 'private',
        },

        // --- Dành cho nhóm ---
        groupName: {
            type: String,
            trim: true,
        },
        groupAvatar: {
            type: String,
        },
        admins: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],

        // --- Tuỳ chỉnh hiển thị ---
        // 1️⃣ Chủ đề đoạn chat (màu chủ đạo, theme)
        theme: {
            name: { type: String, default: 'default' },
            color: { type: String, default: '#0084ff' }, // ví dụ: Messenger blue
        },

        // 2️⃣ Biệt danh: mỗi user có thể đặt biệt danh cho người khác
        nicknames: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                nickname: String,
            },
        ],

        // 3️⃣ Icon biểu tượng gửi tin nhắn (setIcon)
        customEmoji: {
            type: String, // ví dụ: "❤️", "🔥", "👍"
            default: '👍',
        },

        // Tin nhắn cuối cùng
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        },

        // Lưu lịch sử thay đổi (ai đổi chủ đề, đổi biệt danh, v.v.)
        activities: [
            {
                action: String, // e.g., 'change_theme', 'change_nickname', 'set_icon'
                user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                detail: Object, // { old: '', new: '' }
                createdAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true },
);

export default mongoose.model('Conversation', conversationSchema);
