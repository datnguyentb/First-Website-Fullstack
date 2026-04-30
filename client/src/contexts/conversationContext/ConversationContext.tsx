import { createContext, ReactNode, useEffect, useReducer, useRef } from 'react';
import { conversationReducer } from './conversationReducer';
import useGetAllConversations from '~/hooks/conversation/useGetAllConversations';
import useGetConversationDetail from '~/hooks/conversation/useGetConversationDetail';
import { ConversationActionType } from './conversationTypes';
import { ConversationInfo } from '~/types/conversation';
import { ConversationContextType, ConversationState } from './ConversationContextTypes';

export const ConversationContext = createContext<ConversationContextType | null>(null);

const initialState: ConversationState = {
    conversations: [],
};

export const ConversationProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(conversationReducer, initialState);
    const conversationsRef = useRef(state.conversations);
    const { loading, fetchConversations } = useGetAllConversations();
    const { getDetail } = useGetConversationDetail();

    useEffect(() => {
        conversationsRef.current = state.conversations;
    }, [state.conversations]);

    const setConversations = (conversations: ConversationInfo[]) => {
        dispatch({
            type: ConversationActionType.SET_CONVERSATIONS,
            payload: conversations,
        });
    };

    const addConversation = async (conversationId: string) => {
        try {
            // 1. Gọi API lấy chi tiết hội thoại
            const res = await getDetail(conversationId);
            const fullConversation = res.data;

            // 2. Dispatch object đầy đủ vào Reducer
            dispatch({
                type: ConversationActionType.ADD_CONVERSATION,
                payload: fullConversation,
            });
        } catch (error) {
            console.error('Lỗi khi thêm hội thoại mới:', error);
        }
    };

    const updateLastMessage = async (conversationId: string, message: any) => {
        //kiểm tra nhóm này đã tồn tại chưa
        const currentList = conversationsRef.current;
        const isExist = currentList.some((conv) => conv._id === conversationId);

        if (isExist) {
            // CÓ RỒI -> Chỉ update tin nhắn cuối
            dispatch({
                type: ConversationActionType.UPDATE_LAST_MESSAGE,
                payload: {
                    conversationId,
                    lastMessage: {
                        content: message.content,
                        sender: message.sender,
                        createdAt: message.createdAt,
                    },
                    updatedAt: message.createdAt,
                },
            });
        } else {
            const conversationInfor = await getDetail(conversationId);
            if (conversationInfor) {
                dispatch({
                    type: ConversationActionType.ADD_CONVERSATION,
                    payload: conversationInfor,
                });
            }
        }
    };

    useEffect(() => {
        const loadConversations = async () => {
            const conversations = await fetchConversations();
            if (conversations) {
                setConversations(conversations);
            }
        };
        loadConversations();
    }, []);

    return (
        <ConversationContext.Provider
            value={{
                loading,
                conversations: state.conversations,
                setConversations,
                updateLastMessage,
            }}
        >
            {children}
        </ConversationContext.Provider>
    );
};
