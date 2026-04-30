import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { getSocket } from '../../socket/socket.js';
import { socketReducer, initialState } from './socketReducer.js';
import { useSocketConnect } from './useSocketConnect.js';
import useRealtimeEvents from './hook/useRealtimeEvents.js';
import SocketContextType from './SocketContextType.js';

export const SocketContext = createContext<SocketContextType | null>(null);

export function SocketProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(socketReducer, initialState);

    // 1️⃣ Kết nối socket
    useSocketConnect(dispatch);

    // 👇 listen realtime
    useRealtimeEvents(dispatch);

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
