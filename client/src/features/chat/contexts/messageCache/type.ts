import { User } from '~/types';

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

export interface MessageCache {
    messages: Message[];
    loading: boolean;
    hasMore: boolean;
    isFullHistoryLoaded?: boolean;
}

export interface MessageCacheState {
    [conversationId: string]: MessageCache;
}
