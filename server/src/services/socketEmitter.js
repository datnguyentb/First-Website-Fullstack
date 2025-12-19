/**
 * Hàm gửi sự kiện real-time chung cho ứng dụng
 * @param {Object} io - Đối tượng Socket.io
 * @param {String} conversationId - ID phòng (Room) để gửi tới
 * @param {String} type - Loại sự kiện (MESSAGE, TYPING, NOTIFICATION,...)
 * @param {Object} payload - Dữ liệu thực tế (savedMessage, user info,...)
 */
import { SOCKET_EVENTS } from '../constants/socketTypes.js';
export const emitRealtimeEvent = (io, targetRoom, conversationId, type, payload) => {
    if (!io) return;

    io.to(targetRoom.toString()).emit(SOCKET_EVENTS.REALTIME_EVENT, {
        type,
        // Nếu truyền actualConversationId thì dùng, không thì mặc định dùng roomId
        conversation: conversationId || roomId,
        payload,
        timestamp: new Date(),
    });
};
