import { Message } from '@/types/message';

export interface MessageCache {
    messages: Message[];
    loading: boolean;
    hashMore: boolean;
    isFullHistoryLoaded?: boolean;
}

export interface MessageCacheState {
    [conversationId: string]: MessageCache;
}
