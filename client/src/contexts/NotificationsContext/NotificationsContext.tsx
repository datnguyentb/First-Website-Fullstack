import { createContext, useEffect, useReducer } from 'react';

import { notificationsReducer } from './notificationsReducer';

import { UINotification } from '~/types/NotificationsTypes/UINotificationType';
import { SOCKET_NOTIFICATION_ACTIONS } from './type';
import useGetNotifications from '~/hooks/notifications/useGetNotifications';

interface NotificationsContextType {
    notifications: UINotification[];

    setNotifications: (notifications: UINotification[], hasMore?: boolean) => void;

    markAsRead: (id: string) => void;
}

export const NotificationsContext = createContext<NotificationsContextType | null>(null);

export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(notificationsReducer, []);
    const { notifications } = useGetNotifications();

    useEffect(() => {
        if (notifications.length > 0) {
            notifications.map((notification) => {
                setNotifications(notification);
            });
        }
    }, [notifications]);

    const setNotifications = (notifications: UINotification[], hasMore = true) => {
        dispatch({
            type: SOCKET_NOTIFICATION_ACTIONS.ADD_NOTIFICATION,
            payload: notifications,
            hasMore,
        });
    };

    const markAsRead = (id: string) => {
        dispatch({
            type: SOCKET_NOTIFICATION_ACTIONS.MARK_AS_READ,
            id,
        });
    };

    return (
        <NotificationsContext.Provider
            value={{
                notifications: state,

                setNotifications,

                markAsRead,
            }}
        >
            {children}
        </NotificationsContext.Provider>
    );
};
