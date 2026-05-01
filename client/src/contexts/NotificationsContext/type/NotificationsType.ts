// 1. CATEGORY (nhóm logic)
// =======================
export type NotificationCategory = 'SOCIAL' | 'CHAT' | 'SYSTEM' | 'MUSIC';

// 2. ACTION (hành vi cụ thể)

export type NotificationAction =
    | 'LIKE'
    | 'COMMENT'
    | 'REPLY'
    | 'FOLLOW'
    | 'FRIEND_REQUEST'
    | 'FRIEND_ACCEPTED'
    | 'MESSAGE'
    | 'REPORT'
    | 'MENTION'
    | 'SHARE'
    | 'MUSIC_INVITE';

// 3. TARGET (deep link)
export type NotificationTarget =
    | { type: 'POST'; id: string }
    | { type: 'COMMENT'; id: string }
    | { type: 'CONVERSATION'; id: string }
    | { type: 'PROFILE'; id: string }
    | { type: 'MUSIC_ROOM'; id: string };

// 4. ACTOR (người tạo event)
export type NotificationActor = {
    id: string;
    name?: string;
    avatar?: string;
};

// 5. META (mở rộng linh hoạt)
export type NotificationMeta = {
    // 🎧 music
    musicRoomId?: string;
    songId?: string;

    // 💬 comment
    commentId?: string;

    // 🚩 report
    reportReason?: string;

    // extensible
    [key: string]: any;
};

// 6. MAIN MODEL
export type AppNotification = {
    id: string;

    category: NotificationCategory;
    action: NotificationAction;

    title?: string;
    content: string;

    actor?: NotificationActor;
    target?: NotificationTarget;

    // dùng riêng cho chat
    conversationId?: string;

    // trạng thái
    isRead: boolean;
    isSeen: boolean;

    priority?: 'HIGH' | 'NORMAL' | 'LOW';

    createdAt: string;
    updatedAt?: string;

    meta?: NotificationMeta;
};

// 7. STATE (normalized)
export type NotificationsState = {
    byId: Record<string, AppNotification>;
    allIds: string[]; // order theo thời gian
    unreadIds: Set<string>; // tối ưu unread count

    loading: boolean;
    hasMore: boolean;
};

// 8. NotificationsContextType
export interface NotificationsContextType {
    notifications: NotificationsState;

    markAsRead: (id: string) => void;
    markAsSeen: (id: string) => void;
    deleteNotification: (id: string) => void;
    clearNotifications: () => void;

    fetchNotifications: (page?: number, limit?: number) => Promise<void>;
}
