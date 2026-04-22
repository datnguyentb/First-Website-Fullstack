export type ToastContextType = {
    showToast: (data: {
        title: string;
        message: string;
        duration?: number;
        avatar?: string;
        action?: () => void;
    }) => void;
    removeToast: (id: number) => void;
};

export interface Toast {
    id: number;
    title: string;
    message: string;
    type?: 'success' | 'error' | 'info';
    eventType?: 'comment' | 'like' | 'mention' | 'follow';
    time?: string;
    avatar?: string;
    duration?: number;
    action?: () => void;
}
