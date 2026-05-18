export interface UINotification {
    id: string;
    user: string;
    avatar?: string;
    content: string;
    action: string;
    time: string;
    unread: boolean;
}
