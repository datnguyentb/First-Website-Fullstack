import { SET_CONVERSATIONS, UPDATE_LAST_MESSAGE } from './conversationTypes';

export const initialState = {
    conversations: [],
};

export const conversationReducer = (state, action) => {
    switch (action.type) {
        case SET_CONVERSATIONS:
            return {
                ...state,
                conversations: action.payload,
            };
        case UPDATE_LAST_MESSAGE: {
            const updatedConversations = state.conversations.map((conv) =>
                conv._id === action.payload.conversationId
                    ? {
                          ...conv,
                          lastMessage: action.payload.lastMessage,
                          updatedAt: action.payload.updatedAt || new Date().toISOString(),
                      }
                    : conv,
            );

            // Sắp xếp lại: Tin nhắn mới nhất (updatedAt lớn nhất) lên đầu
            updatedConversations.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

            return {
                ...state,
                conversations: updatedConversations,
            };
        }
        default:
            return state;
    }
};
