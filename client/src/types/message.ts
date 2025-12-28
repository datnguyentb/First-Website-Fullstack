import { User } from './user';

export interface Message {
    _id: string;
    conversation: string;
    sender: string;
    content: string;
    type: 'text' | 'image' | 'video' | 'file' | 'audio' | 'system';
    attachments?: Array<{
        url: string;
        filename: string;
        fileType: string;
        fileSize: number;
    }>;
    replyTo?: string | null;
    seenBy?: User[];
    reactions?: Record<string, string[]>;
    createdAt: string;
    updatedAt: string;
    status: 'sent' | 'delivered' | 'read' | 'pending' | 'failed';
    metadata?: Record<string, any>;
}
