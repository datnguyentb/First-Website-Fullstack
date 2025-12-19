import { SOCKET_PAYLOAD_TYPES } from '../../constants/socketTypes.js';
import MessageController from '../../controllers/chat/messageController.js';
import ConversationService from '../../services/conversationService.js';
import { emitRealtimeEvent } from '../../services/socketEmitter.js';
import { validateMessage } from '../helpers/validateMessage.js';

const messageEvents = (socket, io) => {
    const userId = socket.user.id;

    socket.on('send-message', async (data) => {
        try {
            // 1. Validate input
            const validatedData = validateMessage(data);
            if (!validatedData) {
                return socket.emit('error', 'Tin nhắn không hợp lệ.');
            }

            // 2. Kiểm tra bắt buộc: phải có conversationId
            if (!validatedData.conversation) {
                return socket.emit('error', 'Thiếu conversationId. Bạn cần tạo cuộc trò chuyện trước.');
            }

            // Kiểm tra conversation tồn tại thật
            const exists = await ConversationService.checkMembership(validatedData.conversation, userId);
            if (!exists) {
                return socket.emit('error', 'Cuộc trò chuyện không tồn tại.');
            }

            // 4. Lưu vào DB
            const savedMessage = await MessageController.saveMessage(validatedData);
            if (savedMessage.status !== 'success') {
                console.error('❌ Message saving failed:', savedMessage);
                return socket.emit('error', 'Không lưu được tin nhắn.');
            }

            // 5. Update lastMessage trong conversation
            const conversationUpdate = await ConversationService.updateLastMessage(
                validatedData.conversation,
                savedMessage.data._id,
            );

            validatedData.sender = savedMessage.data.sender;

            //hoán đổi id
            const tempId = validatedData._id;
            validatedData._id = savedMessage.data._id.toString();
            validatedData.tempId = tempId;

            // 5. Phát cho tắt cả mọi người
            const participantIds = conversationUpdate.participants;
            participantIds.forEach((memberId) => {
                const targetRoom = memberId.toString();
                console.log('targetRoom', targetRoom);
                emitRealtimeEvent(
                    io,
                    targetRoom,
                    validatedData.conversation,
                    SOCKET_PAYLOAD_TYPES.MESSAGE,
                    validatedData,
                );
            });
            // emitRealtimeEvent(io, validatedData.conversation, SOCKET_PAYLOAD_TYPES.MESSAGE, validatedData);
        } catch (err) {
            console.error('❌ Error in sendMessage:', err);
            socket.emit('error', 'Không gửi được tin nhắn.');
        }
    });
};

export default messageEvents;
