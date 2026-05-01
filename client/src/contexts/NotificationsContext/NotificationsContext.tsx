import { createContext, useReducer } from 'react';
import { NotificationsContextType, NotificationsState } from './type/NotificationsType';
import { notificationsReducer } from './notificationsReducer';

export const NotificationsContext = createContext<NotificationsContextType | null>(null);

const initialState: NotificationsState = {
    byId: {},
    allIds: [],
    unreadIds: new Set(),

    loading: false,
    hasMore: true,
};

export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(notificationsReducer, initialState);

    const setNotifications = (notifications: Notification[], hasMore = true) => {
        dispatch({ type: 'SET_NOTIFICATIONS', payload: notifications, hasMore });
    };

    const markAsRead = (id: string) => {
        dispatch({ type: 'MARK_AS_READ', id });
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
