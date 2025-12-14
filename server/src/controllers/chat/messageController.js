import { okResponse, badRequestResponse, serverErrorResponse } from '../../utils/responseHelper.js';

import Message from '../../models/Message.js';
import messageService from '../../services/messageService.js';
import conversationService from '../../services/conversationService.js';

class MessageController {
    // Lưu tin nhắn
    saveMessage = async (payload) => {
        try {
            const newMessage = await messageService.saveMessage(payload);
            await conversationService.updateLastMessage(newMessage.conversation.toString(), newMessage._id);

            return { status: 'success', data: newMessage };
        } catch (error) {
            console.error(error);
            return { status: 'error', error: 'Cannot save message' };
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
