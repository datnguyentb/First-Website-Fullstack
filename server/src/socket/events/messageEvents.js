import MessageController from '../../controllers/chat/messageController.js';
import ConversationService from '../../services/conversationService.js';
import { validateMessage } from '../helpers/validateMessage.js';

const messageEvents = (socket, io) => {
    const userId = socket.user.id;

    socket.on('sendMessage', async (data) => {
        try {
            // 1. Validate input
            const validatedMessage = validateMessage(data);
            if (!validatedMessage) {
                return socket.emit('error', 'Tin nhắn không hợp lệ.');
            }

            // 2. Kiểm tra bắt buộc: phải có conversationId
            if (!validatedMessage.conversation) {
                return socket.emit('error', 'Thiếu conversationId. Bạn cần tạo cuộc trò chuyện trước.');
            }

            // Kiểm tra conversation tồn tại thật
            const exists = await ConversationService.checkMembership(validatedMessage.conversation, userId);
            if (!exists) {
                return socket.emit('error', 'Cuộc trò chuyện không tồn tại.');
            }

            // 3. Thêm người gửi
            validatedMessage.sender = userId;

            // 4. Lưu vào DB
            const savedMessage = await MessageController.saveMessage(validatedMessage);
            if (savedMessage.status !== 'success') {
                console.error('❌ Message saving failed:', savedMessage);
                return socket.emit('error', 'Không lưu được tin nhắn.');
            }

            // 5. Phát cho room
            console.log('Emitting to room:', savedMessage.data);
            io.to(validatedMessage.conversation.toString()).emit('receiveMessage', savedMessage.data);
        } catch (err) {
            console.error('❌ Error in sendMessage:', err);
            socket.emit('error', 'Không gửi được tin nhắn.');
        }
    });
};

export default messageEvents;
