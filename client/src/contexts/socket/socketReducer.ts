import { SOCKET_EVENTS, SOCKET_PAYLOAD_TYPES } from './socketTypes';
import { SocketAction, SocketState } from './type';

export const initialState = {
    socket: null,
    realTimeMessages: [],
    notifications: [],
    activeConversationId: null,
};

export function socketReducer(state: SocketState, action: SocketAction) {
    switch (action.type) {
        case SOCKET_EVENTS.SET_SOCKET:
            return { ...state, socket: action.payload };

        case SOCKET_PAYLOAD_TYPES.MESSAGE:
            // Chỉ thêm vào list real-time nếu tin nhắn thuộc về cuộc hội thoại đang mở
            return {
                ...state,
                realTimeMessages: [...state.realTimeMessages, action.payload],
            };

        case SOCKET_PAYLOAD_TYPES.NOTIFICATION:
            return { ...state, notifications: action.payload };

        case SOCKET_PAYLOAD_TYPES.GROUP_UPDATE:
            return {
                ...state,
                activeConversationId: action.payload,
                realTimeMessages: [], // Xóa tin nhắn cũ khi đổi phòng chat nếu cần
            };

        default:
            return state;
    }
}
