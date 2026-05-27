import { UINotification } from '~/types/NotificationsTypes/UINotificationType';
import { SOCKET_NOTIFICATION_ACTIONS } from './type';

interface SetNotificationsAction {
    type: typeof SOCKET_NOTIFICATION_ACTIONS.SET_NOTIFICATIONS;
    payload: UINotification[];
}

interface AddNewNotificationAction {
    type: typeof SOCKET_NOTIFICATION_ACTIONS.ADD_NEW_NOTIFICATION;
    payload: UINotification; // Nhận vào 1 thông báo đơn lẻ
}

interface MARK_ALL_AS_READ {
    type: typeof SOCKET_NOTIFICATION_ACTIONS.MARK_ALL_AS_READ;
}

type Action = SetNotificationsAction | AddNewNotificationAction | MARK_ALL_AS_READ;

export const notificationsReducer = (state: UINotification[], action: Action): UINotification[] => {
    switch (action.type) {
        case SOCKET_NOTIFICATION_ACTIONS.SET_NOTIFICATIONS:
            // Thay thế toàn bộ bằng danh sách mới từ API
            return [...action.payload];

        case SOCKET_NOTIFICATION_ACTIONS.ADD_NEW_NOTIFICATION:
            // Kiểm tra xem thông báo này đã tồn tại trong mảng chưa (tránh lỗi trùng lặp do socket)
            const isExist = state.some((n) => n._id === action.payload._id);
            if (isExist) return state;

            // Chèn thông báo mới tinh lên ĐẦU MẢNG ([mới, ...cũ])
            return [action.payload, ...state];

        case SOCKET_NOTIFICATION_ACTIONS.MARK_ALL_AS_READ:
            return state.map((notification) => ({
                ...notification,
                isRead: true, // Hoặc status: 'READ' tùy thuộc vào Type của bạn
            }));

        default:
            return state;
    }
};
