import { ReactNode, RefObject } from 'react';

// Xuất ra để các file khác có thể dùng nếu cần
export type DialogType = 'delete' | 'report' | 'confirm' | 'warning' | 'default';

export interface ActionDialogProps {
    title?: string;
    description?: string;
    children?: ReactNode;
    confirmText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    reasonTitle?: string;
    timeTitle?: string;
    senToUser?: boolean;
    notifyRef?: RefObject<HTMLInputElement>;
    reasonRef?: RefObject<HTMLTextAreaElement>;
    timeLockedRef?: RefObject<HTMLInputElement>;
    type?: DialogType;
}
