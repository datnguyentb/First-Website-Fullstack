import { UINotification } from '~/types/NotificationsTypes/UINotificationType';
import { SOCKET_NOTIFICATION_ACTIONS } from './type';

interface Action {
    type: string;
    payload?: any;
    id?: string;
    hasMore?: boolean;
}

export const notificationsReducer = (state: UINotification[], action: Action) => {
    switch (action.type) {
        case SOCKET_NOTIFICATION_ACTIONS.ADD_NOTIFICATION:
            return [...state, action.payload];

        default:
            return state;
    }
};
