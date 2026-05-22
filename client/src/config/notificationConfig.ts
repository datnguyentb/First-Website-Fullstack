import { NotificationAction } from '~/types/NotificationsTypes/notificationType';

interface NotificationConfig {
    icon: string;

    getMessage: (fullName: string) => string;

    getLink: (targetId: string, actorId?: string) => string;
}

export const notificationConfig: Record<NotificationAction, NotificationConfig> = {
    LIKE: {
        icon: '❤️',

        getMessage: (fullName) => `${fullName} đã thích bài viết của bạn`,

        getLink: (targetId) => `/post/${targetId}`,
    },

    COMMENT: {
        icon: '💬',

        getMessage: (fullName) => `${fullName} đã bình luận bài viết của bạn`,

        getLink: (targetId) => `/post/${targetId}`,
    },

    REPLY: {
        icon: '↩️',

        getMessage: (fullName) => `${fullName} đã trả lời bình luận của bạn`,

        getLink: (targetId) => `/post/${targetId}`,
    },

    FOLLOW: {
        icon: '👤',

        getMessage: (fullName) => `${fullName} đã theo dõi bạn`,

        getLink: (_, actorId) => `/profile/${actorId}`,
    },

    FRIEND_REQUEST: {
        icon: '🤝',

        getMessage: (fullName) => `${fullName} đã gửi lời mời kết bạn`,

        getLink: () => `/friends/requests`,
    },

    FRIEND_ACCEPTED: {
        icon: '✅',

        getMessage: (fullName) => `${fullName} đã chấp nhận lời mời kết bạn`,

        getLink: (_, actorId) => `/profile/${actorId}`,
    },

    MESSAGE: {
        icon: '✉️',

        getMessage: (fullName) => `${fullName} đã gửi tin nhắn cho bạn`,

        getLink: (targetId) => `/messages/${targetId}`,
    },

    MENTION: {
        icon: '@',

        getMessage: (fullName) => `${fullName} đã nhắc đến bạn`,

        getLink: (targetId) => `/messages/${targetId}`,
    },

    MUSIC_INVITE: {
        icon: '🎵',

        getMessage: (fullName) => `${fullName} đã mời bạn vào phòng nhạc`,

        getLink: (targetId) => `/music-room/${targetId}`,
    },

    REPORT: {
        icon: '⚠️',

        getMessage: () => `Bài viết của bạn đã bị báo cáo`,

        getLink: () => `/support`,
    },

    SHARE: {
        icon: '📤',

        getMessage: (fullName) => `${fullName} đã chia sẻ bài viết của bạn`,

        getLink: (targetId) => `/post/${targetId}`,
    },

    TAG: {
        icon: '🏷️',

        getMessage: (fullName) => `${fullName} đã gắn thẻ bạn`,

        getLink: (targetId) => `/post/${targetId}`,
    },
};
