import { okResponse, badRequestResponse, serverErrorResponse } from '../../utils/responseHelper.js';

import Message from '../../models/Message.js';
import messageService from '../../services/messageService.js';

class MessageController {
    // Lưu tin nhắn
    saveMessage = async (payload) => {
        try {
            const newMessage = await messageService.saveMessage(payload);

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
            const result = await messageService.getMessages(conversationId);
            return okResponse(res, result);
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
