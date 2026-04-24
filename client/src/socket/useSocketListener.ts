import { useEffect } from 'react';
import { getSocket } from './socket';
import { emitEvent } from './eventBus';
import { SOCKET_EVENTS } from './socketTypes';

export const useSocketListener = () => {
    useEffect(() => {
        const socket = getSocket();
        if (!socket) return;

        const handleRealtimeEvent = (data: any) => {
            console.log('📡 realtime:', data);

            emitEvent(data); // 🔥 chỉ emit thôi
        };

        socket.on(SOCKET_EVENTS.REALTIME_EVENT, handleRealtimeEvent);

        return () => {
            socket.off(SOCKET_EVENTS.REALTIME_EVENT, handleRealtimeEvent);
        };
    }, []);
};
