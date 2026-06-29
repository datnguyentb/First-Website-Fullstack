import { canAccessConversation } from '../helpers/permissions.js';

const conversationEvents = (socket) => {
    const userId = socket.user._id;

    // Join conversation
    socket.on('joinConversation', async (conversationId) => {
        const allowed = await canAccessConversation(conversationId, userId);
        if (!allowed) return socket.emit('error', 'Không có quyền truy cập cuộc trò chuyện.');
        console.log('join room: ', conversationId);

        socket.join(conversationId);
    });

    // Leave conversation
    socket.on('leaveConversation', (conversationId) => {
        if (!conversationId) return;
        console.log('leave room: ', conversationId);
        socket.leave(conversationId);
    });
};

export default conversationEvents;
