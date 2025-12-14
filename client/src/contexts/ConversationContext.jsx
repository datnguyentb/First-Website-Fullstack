import { createContext } from 'react';
import useGetAllConversations from '~/hooks/conversation/useGetAllConversations';

export const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
    const { conversationsList, setConversationsList, loading, fetchMore, hasMore } = useGetAllConversations();

    return (
        <ConversationContext.Provider
            value={{
                conversationsList,
                setConversationsList,
                loading,
                fetchMore,
                hasMore,
            }}
        >
            {children}
        </ConversationContext.Provider>
    );
};

/*
{
  "_id": "abc123",
  "name": "John Doe",
  "avatar": "https://...",
  "lastMessage": {
    "content": "Hey, what's up?",
    "sender": "user123",
    "createdAt": "2025-12-10T00:00:00Z"
  },
  "unreadCount": 2,
  "type": "private",
  "members": [
    { "_id": "user123", "name": "Tùng", "avatar": "..." },
    { "_id": "user456", "name": "Đạt", "avatar": "..." }
  ],
  "updatedAt": "2025-12-10T00:00:00Z"
}

*/
