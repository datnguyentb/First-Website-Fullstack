import { Message } from '~/types';

export interface MessageCacheContextType {
    messages: MessageCache;

    setMessages: (conversationId: string, messages: Message[], hasMore?: boolean) => void;

    addIncomingMessage: (conversationId: string, message: Message) => void;

    addPendingMessage: (conversationId: string, message: Message) => void;

    deleteMessage: (conversationId: string, messageId: string) => void;
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
