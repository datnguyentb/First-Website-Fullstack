// /socket/events/messageEvents.js

import MessageController from '../../controllers/chat/messageController.js';
import ConversationService from '../../services/conversationService.js';

/**
 * Đăng ký các sự kiện liên quan đến Tin nhắn và Conversation.
 * @param {object} socket Đối tượng socket của client
 * @param {object} io Đối tượng Server IO
 * @param {Map} onlineUsers Danh sách người dùng online
 */
const messageEvents = (socket, io, onlineUsers) => {
    // Khi user tham gia 1 cuộc trò chuyện (conversation)
    socket.on('joinConversation', (conversationId) => {
        socket.join(conversationId);
        console.log(`User ${socket.user.id} joined conversation: ${conversationId}`);
    });

    // Khi user rời khỏi cuộc trò chuyện
    socket.on('leaveConversation', (conversationId) => {
        socket.leave(conversationId);
        console.log(`🏃 User ${socket.user.id} left conversation: ${conversationId}`);
    });

    // Khi gửi tin nhắn
    socket.on('sendMessage', async (messageData) => {
        if (!messageData || !messageData.content) return;

        messageData.senderId = socket.user._id; // Dùng _id

        let targetConversationId = messageData?.conversationId;

        if (!targetConversationId) {
            // Trường hợp 1: Tin nhắn đầu tiên, sử dụng Service để tạo Conversation
            if (!messageData.receiverId) return;

            const conversation = await ConversationService.findOrCreatePrivateConversation(
                messageData.senderId,
                messageData.receiverId,
            );
            targetConversationId = conversation._id;
            messageData.conversationId = targetConversationId;
        } else {
            const isMember = await ConversationService.checkMembership(targetConversationId, messageData.senderId);

            if (!isMember) {
                socket.emit('error', 'Bạn không có quyền gửi vào cuộc trò chuyện này.');
                return;
            }
        }

        // --- 💾 LƯU VÀ PHÂN PHỐI TIN NHẮN ---

        messageData.timestamp = new Date().toISOString();

        try {
            const savedMessage = await MessageController.saveMessage(messageData);

            // Gửi tin nhắn đến tất cả client trong room/conversation
            io.to(targetConversationId.toString()).emit('receiveMessage', savedMessage);
        } catch (error) {
            console.error('Lỗi DB khi lưu tin nhắn:', error.message);
            socket.emit('error', 'Lỗi server khi lưu tin nhắn.');
        }
    });
};

export default messageEvents;
