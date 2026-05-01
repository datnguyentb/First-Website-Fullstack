import { Dispatch, SetStateAction } from 'react';

export type ChatWidgetContextType = {
    isOpenChatWidget: boolean;
    isShowFriendsList: boolean;
    setIsShowFriendsList: Dispatch<SetStateAction<boolean>>;
    setIsOpenChatWidget: Dispatch<SetStateAction<boolean>>;
    setConversationId: Dispatch<SetStateAction<string>>;
    conversationId: string;
};
