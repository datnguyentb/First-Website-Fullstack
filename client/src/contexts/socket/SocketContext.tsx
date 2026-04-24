import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { getSocket } from '../../socket/socket.js';
import { socketReducer, initialState } from './socketReducer.js';
import { useConversationContext, useMessageCacheContext } from '~/contexts';
import { SocketEventData } from './type.js';
import { SOCKET_EVENTS, SOCKET_PAYLOAD_TYPES } from '../../socket/socketTypes.js';
import { useSocketConnect } from './useSocketConnect.js';

export const SocketContext = createContext();

export function SocketProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(socketReducer, initialState);
    const { addIncomingMessage } = useMessageCacheContext();
    const { updateLastMessage } = useConversationContext();

    // 1️⃣ Kết nối socket
    useSocketConnect(dispatch);

    // 2️⃣ Lắng nghe realtimeEvent (DUY NHẤT)
    useEffect(() => {
        const socket = getSocket();
        if (!socket) return;

        const handleRealtimeEvent = (data: SocketEventData) => {
            switch (data.type) {
                case SOCKET_PAYLOAD_TYPES.MESSAGE: {
                    const { conversation, payload } = data;
                    addIncomingMessage(conversation, payload);
                    updateLastMessage(conversation, payload);
                    break;
                }

                case SOCKET_PAYLOAD_TYPES.NOTIFICATION:
                    dispatch({
                        type: SOCKET_PAYLOAD_TYPES.NOTIFICATION,
                        payload: data.payload,
                    });
                    break;
            }
        };

        socket.on(SOCKET_EVENTS.REALTIME_EVENT, handleRealtimeEvent);

        return () => {
            socket.off(SOCKET_EVENTS.REALTIME_EVENT, handleRealtimeEvent);
        };
    }, []);

    return (
        <SocketContext.Provider
            value={{
                ...state,
                socket: state.socket || getSocket(),
            }}
        >
            {children}
        </SocketContext.Provider>
    );
}
