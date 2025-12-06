import MessageController from '../../controllers/chat/messageController.js';
import ConversationService from '../../services/conversationService.js';
import { validateMessage } from '../helpers/validateMessage.js';

const messageEvents = (socket, io) => {
    const userId = socket.user._id;

    // Send message
    socket.on('sendMessage', async (payload) => {
        const msg = validateMessage(payload);
        if (!msg) return socket.emit('error', 'Tin nhắn không hợp lệ.');

        msg.senderId = userId;

        // auto create conversation nếu cần
        const conversationId = await ConversationService.getOrCreateConversation(msg);

        msg.conversationId = conversationId;
        msg.timestamp = new Date();

        try {
            const saved = await MessageController.saveMessage(msg);
            io.to(conversationId.toString()).emit('receiveMessage', saved);
        } catch (err) {
            socket.emit('error', 'Server error khi gửi tin.');
        }
    });
};

export default messageEvents;
