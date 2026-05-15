type RealtimeEvent<T = unknown> = {
    event: 'notification' | 'message' | 'friend' | 'system',
    type: string,

    data: T,

    meta?: {
        senderId?: string,
        conversationId?: string,
        notificationId?: string,
    },

    timestamp: string,
};
