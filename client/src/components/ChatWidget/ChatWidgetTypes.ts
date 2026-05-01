import { ConversationInfo } from '@/types/conversation';
import { Dispatch, SetStateAction } from 'react';

export interface ChatWidgetProps {
    // Hàm để đóng/mở widget, nhận vào giá trị boolean
    setIsOpenChatWidget: Dispatch<SetStateAction<boolean>>;
    isShowFriendsList: boolean;
    setIsShowFriendsList: Dispatch<SetStateAction<boolean>>;

    // ID của cuộc hội thoại, thường là string hoặc number
    conversationId: string;
}

export interface ChatWidgetWindowHeaderProps {
    setIsOpenChatWidget: Dispatch<SetStateAction<boolean>>;
    conversationInfo: ConversationInfo;
}

export interface ChatInputProps {
    conversationId: string;
}
