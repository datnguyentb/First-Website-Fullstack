import { AppNotification } from '../type/NotificationsType';

const normalizeNotification = (raw: any): AppNotification => {
    return {
        id: raw._id,

        category: raw.category,
        action: raw.action,

        content: raw.content,
        title: raw.title,

        actor: raw.actor,
        target: raw.target,

        conversationId: raw.conversationId,

        isRead: raw.read ?? false,
        isSeen: raw.seen ?? false,

        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,

        meta: raw.meta,
    };
};

export default normalizeNotification;
