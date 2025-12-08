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
    // Lưu tin nhắn
    saveMessage = async (payload) => {
        try {
            const { sender, conversation, type, content, attachments, replyTo } = payload;

            if (!conversation || !sender || !content) {
                return badRequestResponse(res, 'Missing required fields');
            }

            const newMessage = new Message({
                sender: sender,
                conversation: conversation,
                content,
                type: type || 'text',
                attachments: attachments || [],
                replyTo: replyTo || null,
                seenBy: [],
            });

            await newMessage.save();

            const populatedMessage = await newMessage.populate('sender', 'firstName lastName avatarUrl');

            return { status: 'success', data: populatedMessage };
        } catch (error) {
            console.error(error);
            return serverErrorResponse(res, 'Cannot save message');
        }
    };

    // Lấy tin nhắn trong cuộc trò chuyện
    getMessages = async (req, res) => {
        try {
            const { conversationId } = req.params;
            if (!conversationId) return badRequestResponse(res, 'Missing conversationId');

            const messages = await Message.find({ conversation: conversationId })
                .populate('sender', 'firstName lastName avatarUrl')
                .sort({ createdAt: -1 })
                .limit(50);

            return okResponse(res, messages);
        } catch (error) {
            console.error(error);
            return serverErrorResponse(res, 'Cannot get messages');
        }
    };

    // Đánh dấu tin nhắn đã xem
    markAsSeen = (messageId, userId) => {
        return Message.findByIdAndUpdate(messageId, { $addToSet: { seenBy: userId } }, { new: true });
    };
}

export default new MessageController();
