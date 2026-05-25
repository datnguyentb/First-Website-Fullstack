export type ToastContextType = {
    toasts: Toast[];
    addToast: (data: Toast) => void;
    removeToast: (id: string) => void;
};

export interface Toast {
    id: string;
    title: string;
    message: string;
    type?: 'success' | 'error' | 'info';
    eventType?: 'comment' | 'like' | 'mention' | 'follow';
    time?: string;
    avatar?: string;
    link?: string;
}
