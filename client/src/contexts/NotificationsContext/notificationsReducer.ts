interface Action {
    type: string;
    payload?: any;
    id?: string;
    hasMore?: boolean;
}

export const notificationsReducer = (state: NotificationsState, action: Action) => {
    switch (action.type) {
        case 'SET_NOTIFICATIONS':
            const newById = { ...state.byId };
            const newAllIds = [...state.allIds];

            action.payload.forEach((notification: Notification) => {
                if (!newById[notification._id]) {
                    newById[notification._id] = notification;
                    newAllIds.push(notification._id);
                }
            });

            return {
                ...state,
                byId: newById,
                allIds: newAllIds,
                unreadIds: new Set([
                    ...state.unreadIds,
                    ...action.payload.filter((n: Notification) => !n.read).map((n: Notification) => n._id),
                ]),
                loading: false,
                hasMore: action.hasMore ? true : false,
            };

        case 'MARK_AS_READ':
            if (!action.id || !state.byId[action.id]) return state;

            const updatedById = {
                ...state.byId,
                [action.id]: {
                    ...state.byId[action.id],
                    read: true,
                },
            };

            const updatedUnreadIds = new Set(state.unreadIds);
            updatedUnreadIds.delete(action.id);

            return {
                ...state,
                byId: updatedById,
                unreadIds: updatedUnreadIds,
            };

        default:
            return state;
    }
};
