import { notificationConfig } from '~/config/notificationConfig';
import { NotificationPayload } from '~/types/NotificationsTypes/notificationType';

import { NotificationActionHandler, UINotification } from '~/types/NotificationsTypes/UINotificationType';

export const mappedNotification = (notification: NotificationPayload): UINotification => {
    const data = notification.data;

    console.log('notification: ', notification);
    console.log('Mapping notification data:', notification.data);
    const actor = data.actors?.[0];

    const fullName = actor ? `${actor.firstName} ${actor.lastName}` : 'Unknown User';

    const config = notificationConfig[data.action];

    let action: NotificationActionHandler;
    switch (data.category) {
        case 'SOCIAL':
            switch (data.target.type) {
                case 'POST':
                    action = { type: 'NAVIGATE_POST', payload: { postId: data.target.targetId } };
                    break;
                case 'COMMENT':
                    action = { type: 'NAVIGATE_COMMENT', payload: { commentId: data.target.targetId } };
                    break;
                case 'PROFILE':
                    action = { type: 'NAVIGATE_PROFILE', payload: { userId: data.target.targetId } };
                    break;
                default:
                    action = { type: 'NAVIGATE_POST', payload: { postId: data.target.targetId } };
            }
            break;
        case 'CHAT':
            switch (data.target.type) {
                case 'CONVERSATION':
                    action = { type: 'OPEN_CHAT', payload: { conversationId: data.target.targetId } };
                    break;
                default:
                    action = { type: 'OPEN_CHAT', payload: { conversationId: data.target.targetId } };
            }
            break;
        case 'MUSIC':
            switch (data.target.type) {
                case 'MUSIC_ROOM':
                    action = { type: 'OPEN_MUSIC_ROOM', payload: { roomId: data.target.targetId } };
                    break;
                default:
                    action = { type: 'OPEN_MUSIC_ROOM', payload: { roomId: data.target.targetId } };
            }
            break;
        case 'SYSTEM':
            switch (data.action) {
                case 'FRIEND_REQUEST':
                    action = { type: 'OPEN_FRIEND_REQUESTS' };
                    break;
                case 'REPORT':
                    action = { type: 'OPEN_SUPPORT' };
                    break;
                default:
                    action = { type: 'OPEN_SUPPORT' };
            }
            break;
    }

    return {
        id: data._id,

        user: fullName,

        avatar: actor?.avatar,

        content: config?.getMessage(fullName) ?? data.content,

        action: action,

        time: data.createdAt,

        unread: !data.isRead,

        isSeen: data.isSeen ?? false,

        icon: config?.icon ?? '🔔',
    };
};
