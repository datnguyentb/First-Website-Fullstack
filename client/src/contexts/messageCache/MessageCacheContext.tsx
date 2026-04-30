import { createContext, useReducer, ReactNode } from 'react';
import { messageCacheReducer } from './messageCacheReducer';
import { Message } from '~/types/message';
import { MessageCacheActionType } from './messageCacheTypes';
import { MessageCacheContextType } from './MessageCacheContextType';
import { MessageCacheState } from './type';

export const MessageCacheContext = createContext<MessageCacheContextType | null>(null);

const initialState: MessageCacheState = {};

export const MessageCacheProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(messageCacheReducer, initialState);

    const setMessages = (conversationId: string, messages: Message[], hasMore = true) => {
        dispatch({
            type: MessageCacheActionType.SET_MESSAGES,
            conversationId,
            payload: messages,
            hasMore,
        });
    };

    const addIncomingMessage = (conversationId: string, message: Message) => {
        dispatch({
            type: MessageCacheActionType.ADD_INCOMING_MESSAGE,
            conversationId,
            payload: message,
        });
    };

    const addPendingMessage = (conversationId: string, message: Message) => {
        dispatch({
            type: MessageCacheActionType.ADD_PENDING_MESSAGE,
            conversationId,
            payload: message,
        });
    };

    const deleteMessage = (conversationId: string, messageId: string) => {
        dispatch({
            type: MessageCacheActionType.DELETE_MESSAGE,
            conversationId,
            messageId,
        });
    };

    return (
        <MessageCacheContext.Provider
            value={{
                messages: state,
                setMessages,
                addIncomingMessage,
                addPendingMessage,
                deleteMessage,
            }}
        >
            {children}
        </MessageCacheContext.Provider>
    );
};
