export interface NotificationActionHandler {
    type:
        | 'NAVIGATE_POST'
        | 'NAVIGATE_PROFILE'
        | 'OPEN_CHAT'
        | 'OPEN_MUSIC_ROOM'
        | 'OPEN_FRIEND_REQUESTS'
        | 'OPEN_SUPPORT'
        | 'NAVIGATE_COMMENT';

    payload?: Record<string, any>;
}

export interface UINotification {
    _id: string;

    user: string;

    avatar?: string;

    content: string;

    icon?: string;

    time: string;

    isRead: boolean;

    isSeen: boolean;

    action: NotificationActionHandler;
}
