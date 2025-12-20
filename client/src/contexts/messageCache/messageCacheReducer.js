import {
    SET_MESSAGES,
    ADD_INCOMING_MESSAGE,
    ADD_PENDING_MESSAGE,
    REPLACE_MESSAGE,
    DELETE_MESSAGE,
} from './messageCacheTypes';

export const messageCacheReducer = (state, action) => {
    const { conversationId } = action;

    switch (action.type) {
        case SET_MESSAGES:
            return {
                ...state,
                [conversationId]: {
                    messages: action.payload,
                    loading: false,
                    hashMore: action.hashMore,
                    isFullHistoryLoaded: true,
                },
            };

        case ADD_PENDING_MESSAGE:
            return {
                ...state,
                [conversationId]: {
                    ...state[conversationId],
                    messages: [action.payload, ...state[conversationId].messages],
                },
            };

        case ADD_INCOMING_MESSAGE: {
            const { conversationId, payload: incomingMsg } = action;

            // 1. Lấy trạng thái hiện tại của cuộc hội thoại, nếu chưa có thì khởi tạo mặc định
            const current = state[conversationId] || {
                messages: [],
                loading: false,
                hasMore: true,
            };

            // 2. Tìm vị trí của tin nhắn tạm (Pending) dựa trên tempId
            const existingIndex = current.messages.findIndex((m) => m._id === incomingMsg.tempId);

            let newMessages;

            if (existingIndex !== -1) {
                // TRƯỜNG HỢP 1: REPLACE (Thay thế)
                // Dành cho người gửi: Cập nhật tin nhắn từ "Mờ" sang "Rõ"
                newMessages = [...current.messages];
                newMessages[existingIndex] = {
                    ...incomingMsg,
                    // Xóa tempId đi vì giờ đã có _id thật từ Server
                    tempId: undefined,
                    status: 'sent',
                };
            } else {
                // TRƯỜNG HỢP 2: APPEND (Thêm mới)
                // Dành cho người nhận: Kiểm tra trùng lặp ID thật để tránh lỗi mạng hiện tin 2 lần
                const isDuplicate = current.messages.some((m) => m._id === incomingMsg._id);

                if (isDuplicate) return state;

                // Thêm tin nhắn mới vào đầu danh sách
                newMessages = [incomingMsg, ...current.messages];
            }

            // 3. Trả về state mới với danh sách messages đã được cập nhật
            return {
                ...state,
                [conversationId]: {
                    ...current,
                    messages: newMessages,
                },
            };
        }

        case DELETE_MESSAGE:
            return {
                ...state,
                [conversationId]: {
                    ...state[conversationId],
                    messages: state[conversationId].messages.map((m) =>
                        m._id === action.messageId ? { ...m, isDeleted: true } : m,
                    ),
                },
            };

        default:
            return state;
    }
};
