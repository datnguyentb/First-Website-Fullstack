// /socket/events/userStatusEvents.js

/**
 * Đăng ký các sự kiện liên quan đến Trạng thái Người dùng.
 * @param {object} socket Đối tượng socket của client
 * @param {object} io Đối tượng Server IO
 * @param {Map} onlineUsers Danh sách người dùng online
 */
const userStatusEvents = (socket, io, onlineUsers) => {
    const userId = socket.user.id; // Lấy userId đã gắn từ middleware

    socket.on('addUser', () => {
        onlineUsers.set(userId, socket.id);
        socket.data.userId = userId; // Gắn thêm userId vào data của socket
        console.log(`User ${userId} is now online. Total online: ${onlineUsers.size}`);
    });

    // Khi ngắt kết nối
    socket.on('disconnect', () => {
        if (onlineUsers.get(userId) === socket.id) {
            onlineUsers.delete(userId);
            console.log(`🔴 User ${userId} disconnected. Remaining online: ${onlineUsers.size}`);
        } else {
            console.log(`🔴 Socket disconnected: ${socket.id}`);
        }
    });
};

export default userStatusEvents;
