import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        // 👤 Người gửi
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        // 💬 Cuộc trò chuyện
        conversation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation',
            required: true,
        },

        // 📝 Nội dung
        content: { type: String, trim: true, default: '' },

        // 📎 Tệp đính kèm
        attachments: [
            {
                url: { type: String, required: true },
                type: {
                    type: String,
                    enum: ['image', 'video', 'audio', 'file'],
                    required: true,
                },
                fileName: String,
                size: Number,
            },
        ],

        // ↩️ Tin nhắn được trả lời (nếu có)
        replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: null },

        // 💗 Cảm xúc
        reactions: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                emoji: String,
            },
        ],

        // 👁️ Ai đã xem
        seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

        // 📶 Trạng thái gửi
        status: {
            type: String,
            enum: ['sent', 'delivered', 'seen'],
            default: 'sent',
        },

        // 🗑️ Xóa / Thu hồi
        deletedFor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        isUnsent: { type: Boolean, default: false },
    },
    { timestamps: true },
);

// ⚡ Index để tìm tin nhắn nhanh hơn
messageSchema.index({ conversation: 1, createdAt: -1 });

export default mongoose.model('Message', messageSchema);
