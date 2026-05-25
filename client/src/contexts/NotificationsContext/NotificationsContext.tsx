import { createContext, useEffect, useReducer } from 'react';
import { notificationsReducer } from './notificationsReducer';
import { UINotification } from '~/types/NotificationsTypes/UINotificationType';
import { SOCKET_NOTIFICATION_ACTIONS } from './type';
import useGetNotifications from '~/hooks/notifications/useGetNotifications';

interface NotificationsContextType {
    notifications: UINotification[];
    addNewNotification: (notification: UINotification) => void;
    // Bạn có thể giữ hoặc bỏ setNotifications cũ tùy nhu cầu, nhưng nên đổi logic bên trong
}

export const NotificationsContext = createContext<NotificationsContextType | null>(null);

export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentNotifications, dispatch] = useReducer(notificationsReducer, []);
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

    return (
        <NotificationsContext.Provider
            value={{
                notifications: currentNotifications,
                addNewNotification, // Cung cấp hàm này xuống các component con hoặc hook socket
            }}
        >
            {children}
        </NotificationsContext.Provider>
    );
};
