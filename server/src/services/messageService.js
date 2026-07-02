import Message from '../models/Message.js';
import MessageRepository from '../repositories/messageRepository.js';
import { messageEmitter } from '../socket/emitters/realtimeEmitter.js';
import { validateNewMessage } from '../socket/helpers/validateNewMessage.js';
import conversationService from './conversationService.js';

const sendMessage = async (data, userId) => {
    // new code
    const validatedData = validateNewMessage(data);
    const clientSideId = validatedData?.metadata?.clientSideId || null;

    // 1. Validate dữ liệu đầu vào
    if (!validatedData) {
        throw new Error('Tin nhắn không hợp lệ.');
    }

    // 2. Kiểm tra bắt buộc: phải có clientSideId
    if (!clientSideId) {
        throw new Error('Missing clientSideId in message metadata');
    }

    // 3. Kiểm tra bắt buộc: phải có conversationId
    if (!validatedData.conversation || !validatedData.sender || !validatedData.content) {
        throw new Error('Missing required fields');
    }

    // 4. Kiểm tra conversation tồn tại thật
    const isMember = await conversationService.checkMembership(validatedData.conversation, userId);
    if (!isMember) {
        throw new Error('Bạn không phải là thành viên của cuộc trò chuyện này.');
    }

    // 5. Lưu vào DB
    const newMessage = await MessageRepository.create(validatedData);

    if (!newMessage) {
        throw new Error('❌ Message saving failed.');
    }

    // 6. Update lastMessage trong conversation
    const conversationUpdate = await conversationService.updateLastMessage(validatedData.conversation, newMessage._id);
    if (!conversationUpdate) {
        throw new Error('❌ Conversation update failed.');
    }

    // 7. add clientSideId to the message payload
    const messagePayload = {
        ...newMessage.toObject(),
        metadata: {
            ...newMessage.metadata,
            clientSideId,
        },
    };

    // 8. Phát cho tắt cả mọi người
    const participantIds = conversationUpdate.participants;
    messageEmitter(participantIds, messagePayload);
};

const getMessages = async (conversationId) => {
    if (!conversationId) {
        throw new Error('Missing conversationId');
    }

    const messages = await MessageRepository.findByConversation(conversationId);

    return messages;
};

export default { sendMessage, getMessages };
