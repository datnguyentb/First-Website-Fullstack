import { createContext, useState } from 'react';

export const MessageCacheContext = createContext();

export const MessageCacheProvider = ({ children }) => {
    const [messageCache, setMessageCache] = useState({});

    const setMessagesForConversation = (conversationId, messages) => {
        setMessageCache((prev) => ({
            ...prev,
            [conversationId]: messages,
        }));
    };

    return (
        <MessageCacheContext.Provider value={{ messageCache, setMessagesForConversation }}>
            {children}
        </MessageCacheContext.Provider>
    );
};
