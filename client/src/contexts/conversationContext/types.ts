import { ConversationActionType } from './conversationTypes';

export interface Conversation {
    _id: string;
    lastMessage?: any;
    updatedAt?: string;
}

export interface ConversationState {
    conversations: Conversation[];
}

export interface ConversationAction {
    type: ConversationActionType;
    payload?: any;
}
