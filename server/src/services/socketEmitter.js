/**
 * Hàm gửi sự kiện real-time chung cho ứng dụng
 * @param {Object} io - Đối tượng Socket.io
 * @param {String} conversationId - ID phòng (Room) để gửi tới
 * @param {String} type - Loại sự kiện (MESSAGE, TYPING, NOTIFICATION,...)
 * @param {Object} payload - Dữ liệu thực tế (savedMessage, user info,...)
 */
import { SOCKET_EVENTS } from '../constants/socketTypes.js';
import { getIO } from '../socket/socket.js';
export const emitRealtimeEvent = (receiverIds, event, data, meta) => {
    const io = getIO();
    if (!io) return;

    // convert receiverIds to array if it's not already
    if (!Array.isArray(receiverIds)) {
        receiverIds = [receiverIds];
    }

    //emit to each receiver's room
    receiverIds.forEach((receiverId) => {
        const targetRoom = receiverId;
        io.to(targetRoom.toString()).emit(SOCKET_EVENTS.REALTIME_EVENT, {
            event,
            data,
            meta,
            timestamp: new Date(),
        });
    });
};
