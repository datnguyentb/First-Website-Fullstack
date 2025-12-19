// ModalContext.js
import { createContext, useState } from 'react';
import { ChatWidget } from '~/components';

export const ChatWidgetContext = createContext();

export const ChatWidgetProvider = ({ children }) => {
    const [isOpenChatWidget, setIsOpenChatWidget] = useState(false);
    const [conversationId, setConversationId] = useState('');

    return (
        <ChatWidgetContext.Provider
            value={{ isOpenChatWidget, setIsOpenChatWidget, setConversationId, conversationId }}
        >
            {children}
        </ChatWidgetContext.Provider>
    );
};
