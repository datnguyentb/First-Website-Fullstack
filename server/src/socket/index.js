import { verifyToken } from '../utils/jwt.js';
import conversationHandler from './handlers/chat/conversation.handler.js.js';
import messageHandler from './handlers/chat/message.handler.js';
import postCommentHandler from './handlers/comment/postComment.handler.js';
import userStatusHandler from './handlers/presence/userStatus.handler.js';
import jwtAuthMiddleware from './middleware/jwtAuth.middleware.js';

const onlineUsers = new Map();

const handleSocketEvents = (io) => {
    // Áp dụng middleware xác thực
    io.use(jwtAuthMiddleware);

    io.on('connection', (socket) => {
        const userId = socket.user._id;
        console.log(`User connected: ${userId}`);
        socket.join(userId.toString());
        onlineUsers.set(userId.toString(), socket.id);
        console.log(`🟢 Socket connected: ${socket.id} (User: ${socket.user._id})`);

        // Đăng ký các event handler cho Trạng thái người dùng
        userStatusHandler(socket, onlineUsers);

        // Đăng ký các event handler cho Cuộc trò chuyện
        conversationHandler(socket);

        // Đăng ký các event handler cho Tin nhắn và Conversation
        messageHandler(socket, onlineUsers);

        // Đăng ký các event handler cho Bình luận
        postCommentHandler(socket);
    });
};

export default handleSocketEvents;
