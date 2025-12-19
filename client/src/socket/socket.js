import { io } from 'socket.io-client';

let socket = null;

/**
 * Hàm khởi tạo (hoặc cập nhật) socket khi có token
 * @param {string} token - JWT token người dùng
 */
export const connectSocket = (token) => {
    if (!token) return null;

    // Nếu socket đã tồn tại, cập nhật token mới
    if (socket) {
        socket.auth = { token };
        socket.connect();
        return socket;
    }

    // Nếu chưa có socket -> tạo mới
    socket = io('http://localhost:5000', {
        auth: { token },
        transports: ['websocket'],
        reconnection: true,
    });

    socket.on('connect', () => {
        console.log('✅ Socket Connected! ID:', socket.id);
    });

    socket.on('disconnect', () => {});

    socket.on('connect_error', () => {});

    return socket;
};

/**
 * Lấy socket hiện tại
 */
export const getSocket = () => socket;

/**
 * Ngắt kết nối socket (khi logout)
 */
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
