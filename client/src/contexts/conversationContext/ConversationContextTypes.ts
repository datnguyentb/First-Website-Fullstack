import { ConversationInfo, Message } from '~/types';
import { ConversationActionType } from './conversationTypes';

export interface ConversationState {
    conversations: ConversationInfo[];
}

export interface ConversationAction {
    type: ConversationActionType;
    payload?: any;
}

export interface ConversationContextType {
    loading: boolean;
    conversations: ConversationInfo[];
    setConversations: (conversations: ConversationInfo[]) => void;
    updateLastMessage: (conversationId: string, message: Message) => void;
}
