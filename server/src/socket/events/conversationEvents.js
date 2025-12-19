import { canAccessConversation } from '../helpers/permissions.js';

const conversationEvents = (socket, io) => {
    const userId = socket.user.id;

    // Join conversation
    socket.on('joinConversation', async (conversationId) => {
        const allowed = await canAccessConversation(conversationId, userId);
        if (!allowed) return socket.emit('error', 'Không có quyền truy cập cuộc trò chuyện.');

        socket.join(conversationId);
    });

    // Leave conversation
    socket.on('leaveConversation', (conversationId) => {
        if (!conversationId) return;
        socket.leave(conversationId);
    });
};

export default conversationEvents;
