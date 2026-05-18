import { NotificationPayload } from '../types/notificationType';
import { UINotification } from '../types/UINotificationType';

export const mappedNotification = (notification: NotificationPayload): UINotification => {
    const actor = notification.data.actors?.[0];
    const data = notification.data;

    return {
        id: data._id,

        user: actor ? `${actor.firstName} ${actor.lastName}` : 'Unknown User',

        avatar: actor?.avatar,

        content: data.content,

        action: data.action,

        time: data.createdAt,

        unread: !data.isRead,
    };
};
