import { createContext, useState, useCallback } from 'react';

export const MessageCacheContext = createContext();

export const MessageCacheProvider = ({ children }) => {
    const [messageCache, setMessageCache] = useState({});

    // Set toàn bộ messages cho conversation
    const setMessagesForConversation = useCallback((conversationId, messages) => {
        setMessageCache((prev) => ({
            ...prev,
            [conversationId]: messages,
        }));
    }, []);

    // Thêm 1 message mới vào cache
    const addMessageToConversation = useCallback((conversationId, message) => {
        setMessageCache((prev) => {
            const oldMessages = prev[conversationId] || [];
            return {
                ...prev,
                [conversationId]: [...oldMessages, message],
            };
        });
    }, []);

    // Xoá cache 1 conversation
    const clearConversationCache = useCallback((conversationId) => {
        setMessageCache((prev) => {
            const newCache = { ...prev };
            delete newCache[conversationId];
            return newCache;
        });
    }, []);

    // Xoá toàn bộ cache (ví dụ logout)
    const clearAllCache = useCallback(() => {
        setMessageCache({});
    }, []);

    return (
        <MessageCacheContext.Provider
            value={{
                messageCache,
                setMessagesForConversation,
                addMessageToConversation,
                clearConversationCache,
                clearAllCache,
            }}
        >
            {children}
        </MessageCacheContext.Provider>
    );
};
