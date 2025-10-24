import { verifyToken } from '../utils/jwt.js';
import { messageController } from '../controllers/chat/messageController.js';
const onlineUsers = new Map();

const handleSocketEvents = (io) => {
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) return next(new Error('Authentication error'));

        try {
            const user = verifyToken(token);
            socket.user = user;
            console.log('✅ Socket authenticated for user:', user.id);
            next();
        } catch (err) {
            next(new Error('Invalid token'));
        }
    });

    io.on('connection', (socket) => {
        console.log(`🟢 Socket connected: ${socket.id}`);

        // Khi user đăng nhập, lưu userId -> socketId
        socket.on('addUser', (userId) => {
            onlineUsers.set(userId, socket.user.id);
            socket.data.userId = userId;
        });

        // Khi user tham gia 1 cuộc trò chuyện (conversation)
        socket.on('joinConversation', (conversationId) => {
            socket.join(conversationId);
            console.log(`User joined conversation: ${conversationId}`);
        });

        //Khi user rời khỏi cuộc trò chuyện
        socket.on('leaveConversation', (conversationId) => {
            socket.leave(conversationId);
            console.log(`🏃 User left conversation: ${conversationId}`);
        });

        // Khi gửi tin nhắn
        socket.on('sendMessage', async (messageData) => {
            if (!messageData || !messageData.content) return;
            messageData.senderId = socket.user.id;
            messageData.timestamp = new Date().toISOString();

            //Luu tin nhắn vào DB ở đây (nếu cần)
            const savedMessage = await messageController.saveMessage(messageData);
            console.log('💾 Message saved to DB:', savedMessage);

            if (messageData.conversationId) {
                console.log('Message', messageData);
                io.to(messageData.conversationId).emit('receiveMessage', messageData);
            } else {
                // Nếu chưa có conversationId → gửi lại riêng cho người gửi
                socket.emit('receiveMessage', messageData);
            }
        });

        // Khi ngắt kết nối
        socket.on('disconnect', () => {
            for (const [userId, socketId] of onlineUsers.entries()) {
                if (socketId === socket.id) {
                    onlineUsers.delete(userId);
                    break;
                }
            }
            console.log(`🔴 Socket disconnected: ${socket.id}`);
        });
    });
};

export default handleSocketEvents;
