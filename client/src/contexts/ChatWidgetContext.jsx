// ModalContext.js
import { createContext, useState } from 'react';
import { ChatWidget } from '~/components';

export const ChatWidgetContext = createContext();

export const ChatWidgetProvider = ({ children }) => {
    const [isOpenChatWidget, setIsOpenChatWidget] = useState(false);
    const [userId, setUserId] = useState('');

    return (
        <ChatWidgetContext.Provider value={{ isOpenChatWidget, setIsOpenChatWidget, setUserId, userId }}>
            {children}

            {isOpenChatWidget && <ChatWidget setIsOpenChatWidget={setIsOpenChatWidget} userId={userId} />}
        </ChatWidgetContext.Provider>
    );
};
