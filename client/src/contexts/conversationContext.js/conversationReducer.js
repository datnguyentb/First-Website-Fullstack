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
        case UPDATE_LAST_MESSAGE:
            return {
                ...state,
                conversations: state.conversations.map((conv) =>
                    conv._id === action.payload.conversationId
                        ? {
                              ...conv,
                              lastMessage: action.payload.lastMessage,
                              updatedAt: action.payload.updatedAt,
                          }
                        : conv,
                ),
            };
        default:
            return state;
    }
};
