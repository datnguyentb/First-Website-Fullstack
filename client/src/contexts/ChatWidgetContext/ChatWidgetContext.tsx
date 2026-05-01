// ModalContext.js
import { createContext, ReactNode, useState } from 'react';
import { ChatWidgetContextType } from './ChatWidgetContextTypes';

export const ChatWidgetContext = createContext<ChatWidgetContextType | undefined>(undefined);

export const ChatWidgetProvider = ({ children }: { children: ReactNode }) => {
    const [isOpenChatWidget, setIsOpenChatWidget] = useState(false);
    const [isShowFriendsList, setIsShowFriendsList] = useState(false);
    const [conversationId, setConversationId] = useState('');

    return (
        <ChatWidgetContext.Provider
            value={{
                isOpenChatWidget,
                setIsOpenChatWidget,
                setConversationId,
                conversationId,
                isShowFriendsList,
                setIsShowFriendsList,
            }}
        >
            {children}
        </ChatWidgetContext.Provider>
    );
};
