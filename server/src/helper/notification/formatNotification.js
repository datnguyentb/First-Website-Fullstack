// helpers/notification/formatNotification.js

export const formatNotification = (notification) => {
    return {
        _id: notification._id,

        action: notification.action,
        category: notification.category,

        content: notification.content,

        actors: notification.actors.map((actor) => ({
            _id: actor._id,
            firstName: actor.firstName,
            lastName: actor.lastName,
            avatar: actor.avatar,
        })),

        target: {
            type: notification.target.type,
            targetId: notification.target.targetId,
        },

        isRead: notification.isRead,
        isSeen: notification.isSeen,

        createdAt: notification.createdAt,
    };
};
