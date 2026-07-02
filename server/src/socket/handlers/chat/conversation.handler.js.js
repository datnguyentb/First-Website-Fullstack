import { canAccessConversation } from '../../helpers/permissions.js';

const conversationHandler = (socket) => {
    const userId = socket.user._id;

    socket.on('joinConversation', async (conversationId) => {
        const allowed = await canAccessConversation(conversationId, userId);
        if (!allowed) {
            return socket.emit('error', 'Không có quyền truy cập cuộc trò chuyện.');
        }

        console.log('Chat join room:', conversationId);
        socket.join(conversationId);
    });

    socket.on('leaveConversation', (conversationId) => {
        if (!conversationId) return;

        console.log('Chat leave room:', conversationId);
        socket.leave(conversationId);
    });
};

export default conversationHandler;
