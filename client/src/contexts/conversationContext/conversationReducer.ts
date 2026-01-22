import { ConversationActionType } from './conversationTypes';
import type { Conversation, ConversationState } from './ConversationContextTypes'; // nếu tách file type

interface Action {
    type: string;
    payload?: any;
}

export const conversationReducer = (state: ConversationState, action: Action): ConversationState => {
    switch (action.type) {
        case ConversationActionType.SET_CONVERSATIONS:
            return {
                ...state,
                conversations: action.payload,
            };

        case ConversationActionType.UPDATE_LAST_MESSAGE: {
            const updatedConversations = state.conversations.map((conv) =>
                conv._id === action.payload.conversationId
                    ? {
                          ...conv,
                          lastMessage: action.payload.lastMessage,
                          updatedAt: action.payload.updatedAt || new Date().toISOString(),
                      }
                    : conv,
            );

            updatedConversations.sort(
                (a, b) => new Date(b.updatedAt ?? 0).getTime() - new Date(a.updatedAt ?? 0).getTime(),
            );

            return {
                ...state,
                conversations: updatedConversations,
            };
        }

        default:
            return state;
    }
};
