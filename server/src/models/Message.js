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

        // 🗂️ Loại tin nhắn
        type: {
            type: String,
            enum: ['text', 'image', 'video', 'audio', 'file', 'system'],
            default: 'text',
        },

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

        metadata: {
            isEdited: { type: Boolean, require: true, default: false },
            isUnsent: { type: Boolean, require: true, default: false },
            unsentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
            unsentAt: { type: Date, default: null },
            clientSideId: { type: String, require: true, default: '' },
        },

        // 👁️ Ai đã xem
        seenBy: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
            default: [],
        },

        // 📶 Trạng thái gửi
        status: {
            type: String,
            enum: ['sent', 'delivered', 'seen'],
            default: 'sent',
        },
    },
    { timestamps: true },
);

// ⚡ Index để tìm tin nhắn nhanh hơn
messageSchema.index({ conversation: 1, createdAt: -1 });

export default mongoose.model('Message', messageSchema);
