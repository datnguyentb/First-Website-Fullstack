import { Message } from '~/types';

export interface MessageCacheContextType {
    messages: MessageCache;
    setMessage: (conversationId: string, messages: Message[]) => void;
    addIncomingMessage: (conversationId: string, messages: Message) => void;
    addPendingMessage: (conversationId: string, messages: Message) => void;
    deleteMessage: (conversationId: string, messages: string) => void;
}
interface MessageCache {
    [conversationId: string]: MessageCacheDetail;
}

interface MessageCacheDetail {
    messages: Message[];
    loading: boolean;
    hasMore: boolean;
    isFullHistoryLoaded: boolean;
}
