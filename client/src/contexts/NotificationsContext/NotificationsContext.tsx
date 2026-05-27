import { createContext, useEffect, useMemo, useReducer } from 'react';
import { notificationsReducer } from './notificationsReducer';
import { UINotification } from '~/types/NotificationsTypes/UINotificationType';
import { SOCKET_NOTIFICATION_ACTIONS } from './type';
import useGetNotifications from '~/hooks/notifications/useGetNotifications';

interface NotificationsContextType {
    notifications: UINotification[];
    addNewNotification: (notification: UINotification) => void;
    markAllNotificationsAsRead: () => void;
    unreadCount: number;
}

export const NotificationsContext = createContext<NotificationsContextType | null>(null);

export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(notificationsReducer, []);
    const { notifications: apiNotifications } = useGetNotifications();

    // 1. Tự động chạy khi web load và API trả về danh sách
    useEffect(() => {
        if (apiNotifications && apiNotifications.length > 0) {
            dispatch({
                type: SOCKET_NOTIFICATION_ACTIONS.SET_NOTIFICATIONS,
                payload: apiNotifications,
            });
        }
    }, [apiNotifications]);

    // 2. Hàm này bạn sẽ gọi khi Socket nhận được thông báo mới real-time
    const addNewNotification = (notification: UINotification) => {
        dispatch({
            type: SOCKET_NOTIFICATION_ACTIONS.ADD_NEW_NOTIFICATION,
            payload: notification,
        });
    };

    // 3. Mark all Notifications As Read
    const markAllNotificationsAsRead = () => {
        dispatch({
            type: SOCKET_NOTIFICATION_ACTIONS.MARK_ALL_AS_READ,
        });
    };

    //4. counter để đếm số thông báo chưa đọc, bạn có thể dùng trong component Header hoặc NotificationPanel
    const unreadCount = useMemo(() => {
        return state.filter((notification) => !notification.isRead).length;
    }, [state]);

    return (
        <NotificationsContext.Provider
            value={{
                notifications: state,
                unreadCount,
                addNewNotification,
                markAllNotificationsAsRead,
            }}
        >
            {children}
        </NotificationsContext.Provider>
    );
};
