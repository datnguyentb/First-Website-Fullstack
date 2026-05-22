export type NotificationAction =
    | 'LIKE'
    | 'COMMENT'
    | 'FOLLOW'
    | 'MENTION'
    | 'MESSAGE'
    | 'SHARE'
    | 'REPLY'
    | 'TAG'
    | 'FRIEND_REQUEST'
    | 'FRIEND_ACCEPTED'
    | 'REPORT'
    | 'MUSIC_INVITE';

export type NotificationCategory = 'SOCIAL' | 'SYSTEM' | 'MUSIC' | 'CHAT';

export interface NotificationActor {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
}

export interface NotificationTarget {
    type: 'POST' | 'COMMENT' | 'CONVERSATION' | 'PROFILE' | 'MUSIC_ROOM';
    targetId: string;
}

export interface NotificationData {
    _id: string;

    action: NotificationAction;

    category: NotificationCategory;

    content: string;

    target: NotificationTarget;

    actors: NotificationActor[];
    createdAt: string;

    isRead?: boolean;
    isSeen?: boolean;

    entityId?: string;

    entityType?: string;
}

export interface NotificationPayload {
    event?: 'NOTIFICATION';

    timestamp?: string;

    data: NotificationData;
}
