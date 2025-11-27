import { verifyToken } from '../utils/jwt.js';
import messageEvents from './events/messageEvents.js';
import userStatusEvents from './events/userStatusEvents.js';

// Biến lưu trữ người dùng online (có thể đặt ở đây hoặc trong userStatusEvents)
const onlineUsers = new Map();

// 1. Middleware xác thực (Tách biệt logic này)
const jwtAuthMiddleware = (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error'));

    try {
        const user = verifyToken(token);
        socket.user = user; // Gắn thông tin user vào socket
        console.log('✅ Socket authenticated for user:', user.id);
        next();
    } catch (err) {
        next(new Error('Invalid token'));
    }
};

const handleSocketEvents = (io) => {
    // Áp dụng middleware xác thực
    io.use(jwtAuthMiddleware);

    io.on('connection', (socket) => {
        console.log(`🟢 Socket connected: ${socket.id} (User: ${socket.user.id})`);

        // Đăng ký các event handler cho Trạng thái người dùng
        userStatusEvents(socket, io, onlineUsers);

        // Đăng ký các event handler cho Tin nhắn và Conversation
        messageEvents(socket, io, onlineUsers);
    });
};

export default handleSocketEvents;
