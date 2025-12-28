import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { connectSocket, disconnectSocket, getSocket } from '../../socket/socket.js';
import { socketReducer, initialState } from './socketReducer.js';
import { useConversationContext, useMessageCacheContext } from '~/contexts';
import { SocketEventData } from './type.js';
import { SOCKET_EVENTS, SOCKET_PAYLOAD_TYPES } from './socketTypes';

export const SocketContext = createContext();

export function SocketProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(socketReducer, initialState);
    const { addIncomingMessage } = useMessageCacheContext();
    const { updateLastMessage } = useConversationContext();

    // 1️⃣ Kết nối socket
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const socket = connectSocket(token);
        dispatch({ type: SOCKET_EVENTS.SET_SOCKET, payload: socket });

        return () => {
            disconnectSocket();
            dispatch({ type: SOCKET_EVENTS.SET_SOCKET, payload: null });
        };
    }, []);

    // 2️⃣ Lắng nghe realtimeEvent (DUY NHẤT)
    useEffect(() => {
        const socket = state.socket || getSocket();
        if (!socket) return;

        const handleRealtimeEvent = (data: SocketEventData) => {
            switch (data.type) {
                case SOCKET_PAYLOAD_TYPES.MESSAGE: {
                    const { conversation, payload } = data;
                    addIncomingMessage(conversation, payload);
                    updateLastMessage(conversation, payload);
                    break;
                }

                case SOCKET_PAYLOAD_TYPES.COMMENT:
                    dispatch({
                        type: SOCKET_PAYLOAD_TYPES.COMMENT,
                        postId: data.targetId,
                        payload: data.payload,
                    });
                    break;

                case SOCKET_PAYLOAD_TYPES.GROUP_UPDATE:
                    dispatch({
                        type: SOCKET_PAYLOAD_TYPES.GROUP_UPDATE,
                        groupId: data.targetId,
                        payload: data.payload,
                    });
                    break;

                case SOCKET_PAYLOAD_TYPES.NOTIFICATION:
                    dispatch({
                        type: SOCKET_PAYLOAD_TYPES.NOTIFICATION,
                        payload: data.payload,
                    });
                    break;

                default:
                    console.warn('⚠️ Unknown realtimeEvent', data);
            }
        };

        socket.on(SOCKET_EVENTS.REALTIME_EVENT, handleRealtimeEvent);

        return () => {
            socket.off(SOCKET_EVENTS.REALTIME_EVENT, handleRealtimeEvent);
        };
    }, [state.socket]);

    // 3️⃣ Helper
    const setActiveConversation = (id: string) => {
        dispatch({ type: SOCKET_PAYLOAD_TYPES.SET_ACTIVE_CONVERSATION, payload: id });
    };

    return (
        <SocketContext.Provider
            value={{
                ...state,
                socket: state.socket || getSocket(),
                setActiveConversation,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
}
