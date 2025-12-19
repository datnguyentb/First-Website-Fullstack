import { createContext, useReducer } from 'react';
import { SET_MESSAGES, ADD_INCOMING_MESSAGE, ADD_PENDING_MESSAGE, DELETE_MESSAGE } from './messageCacheTypes';
import { messageCacheReducer } from './messageCacheReducer';

export const MessageCacheContext = createContext();

const initialState = {};
export const MessageCacheProvider = ({ children }) => {
    const [state, dispatch] = useReducer(messageCacheReducer, initialState);

    const setMessages = (conversationId, messages, hashMore = true) => {
        dispatch({
            type: SET_MESSAGES,
            conversationId,
            payload: messages,
            hashMore,
        });
    };

    const addIncomingMessage = (conversationId, message) => {
        dispatch({
            type: ADD_INCOMING_MESSAGE,
            conversationId,
            payload: message,
        });
    };

    const addPendingMessage = (conversationId, message) => {
        dispatch({
            type: ADD_PENDING_MESSAGE,
            conversationId,
            payload: message,
        });
    };

    const deleteMessage = (conversationId, messageId) => {
        dispatch({
            type: DELETE_MESSAGE,
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
