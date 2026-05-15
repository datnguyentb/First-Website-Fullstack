// /socket/events/userStatusEvents.js

/**
 * Đăng ký các sự kiện liên quan đến Trạng thái Người dùng.
 * @param {object} socket Đối tượng socket của client
 * @param {object} io Đối tượng Server IO
 * @param {Map} onlineUsers Danh sách người dùng online
 */
const userStatusEvents = (socket, onlineUsers) => {
    const userId = socket.user._id;
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
