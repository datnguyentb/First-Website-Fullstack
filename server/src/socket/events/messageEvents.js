// /socket/events/messageEvents.js

import MessageController from '../../controllers/chat/messageController.js';
import ConversationService from '../../services/conversationService.js';

const messageEvents = (socket, io, onlineUsers) => {
    // Join 1 conversation (room)
    socket.on('joinConversation', async (conversationId) => {
        const userId = socket.user._id;

        const isMember = await ConversationService.checkMembership(conversationId, userId);

        if (!isMember) {
            console.log(`❌ User ${userId} tried to join unauthorized conversation: ${conversationId}`);
            socket.emit('error', 'You do not have permission to access this conversation.');
            return;
        }

        socket.join(conversationId);
        console.log(`✅ User ${userId} joined conversation: ${conversationId}`);
    });

    // Leave conversation
    socket.on('leaveConversation', (conversationId) => {
        socket.leave(conversationId);
        console.log(`User ${socket.user.id} left conversation: ${conversationId}`);
    });

    // sendMessage
    socket.on('sendMessage', async (messageData) => {
        // 1. Xác thực dữ liệu tin nhắn
        if (!messageData?.content) return;
        if (!['text', 'image', 'file'].includes(messageData.type)) return;

        //gán thông tin user gửi
        messageData.senderId = socket.user._id;

        let conversationId = messageData?.conversationId;

        // 2. Tạo conversation mới nếu không có conversationId
        if (!conversationId) {
            if (!messageData.receiverId) return;

            const conversation = await ConversationService.findOrCreatePrivateConversation(
                messageData.senderId,
                messageData.receiverId,
            );
            conversationId = conversation._id;
        } else {
            // Kiểm tra quyền gửi tin
            const isMember = await ConversationService.checkMembership(conversationId, messageData.senderId);

            if (!isMember) {
                socket.emit('error', 'Bạn không có quyền gửi vào cuộc trò chuyện này.');
                return;
            }
        }

        // Gán metadata
        messageData.conversationId = conversationId;
        messageData.timestamp = new Date().toISOString();

        // 4. Lưu tin nhắn vào DB
        try {
            const savedMessage = await MessageController.saveMessage(messageData);

            // 5. Phát tin nhắn đến các thành viên trong conversation
            io.to(conversationId.toString()).emit('receiveMessage', savedMessage);
        } catch (error) {
            console.error('Lỗi DB khi gửi tin nhắn:', error.message);
            socket.emit('error', 'Lỗi server khi gửi tin nhắn.');
        }
    });
};

export default messageEvents;
