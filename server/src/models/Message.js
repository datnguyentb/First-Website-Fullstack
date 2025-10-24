import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        // 🧑‍💬 Người gửi
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        // 🗨️ Cuộc trò chuyện (private / group)
        conversation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation',
            required: true,
        },

        // 💬 Nội dung chính (text, emoji, link)
        content: {
            type: String,
            trim: true,
            default: '',
        },

        // 📎 File đính kèm (ảnh, video, file, audio, v.v.)
        attachments: [
            {
                url: { type: String, required: true },
                type: {
                    type: String,
                    enum: ['image', 'video', 'audio', 'file'],
                    required: true,
                },
                fileName: String,
                size: Number, // byte
            },
        ],

        // 🔁 Tin nhắn được reply (nếu có)
        replyTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            default: null,
        },

        // 😍 Reaction: ai đã thả icon gì
        reactions: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                emoji: { type: String }, // ❤️ 😂 👍 😢 v.v.
            },
        ],

        // 👀 Ai đã xem tin nhắn này
        seenBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],

        // ⚙️ Trạng thái gửi tin nhắn (giúp client hiển thị tick ✓)
        status: {
            type: String,
            enum: ['sent', 'delivered', 'seen'],
            default: 'sent',
        },

        // 🕒 Thời điểm gửi, cập nhật
    },
    { timestamps: true },
);

// ⚡ Tạo index để tìm tin nhắn nhanh hơn
messageSchema.index({ conversation: 1, createdAt: -1 });

export default mongoose.model('Message', messageSchema);
