import {
    okResponse,
    badRequestResponse,
    serverErrorResponse,
    createdResponse,
    notFoundResponse,
    forbiddenResponse,
} from '../../utils/responseHelper.js';

import Message from '../../models/Message.js';

class MessageController {
    async saveMessage(messageData) {
        const { senderId, conversationId, content, attachments, replyTo } = messageData;

        if (!conversationId || !senderId || !content) {
            throw new Error('Missing required fields');
        }

        const newMessage = new Message({
            sender: senderId,
            conversation: conversationId,
            content,
            attachments: attachments || [],
            replyTo: replyTo || null,
            seenBy: [senderId],
        });

        await newMessage.save();

        const populatedMessage = await newMessage.populate('sender', 'username avatar');
        return populatedMessage;
    }

    async getMessages(conversationId, limit = 50) {
        if (!conversationId) throw new Error('Missing conversationId');
        return Message.find({ conversationId })
            .populate('sender', 'username avatar')
            .sort({ createdAt: -1 })
            .limit(limit);
    }

    // 👀 Đánh dấu tin nhắn đã xem
    async markAsSeen(messageId, userId) {
        return Message.findByIdAndUpdate(messageId, { $addToSet: { seenBy: userId } }, { new: true });
    }
}

// ✅ Export instance để dùng luôn
export const messageController = new MessageController();
