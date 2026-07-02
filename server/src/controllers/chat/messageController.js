import { okResponse, badRequestResponse, serverErrorResponse } from '../../utils/responseHelper.js';

import Message from '../../models/Message.js';
import messageService from '../../services/messageService.js';
import { formatMessage } from '../../helper/formatMessage.js';

class MessageController {
    // Lấy tin nhắn trong cuộc trò chuyện
    getMessages = async (req, res) => {
        try {
            const { conversationId } = req.params;
            const result = await messageService.getMessages(conversationId);
            const formattedData = result.map((mes) => formatMessage(mes));
            return okResponse(res, formattedData);
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
