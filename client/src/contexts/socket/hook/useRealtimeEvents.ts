import { useEffect, Dispatch } from 'react';
import { getSocket } from '~/socket/socket';
import { SocketEventData } from '../type';
import { SOCKET_EVENTS, SOCKET_PAYLOAD_TYPES } from '~/socket/socketTypes';
import { useConversationContext, useMessageCacheContext } from '~/contexts';

// 👇 define action type (nên đặt chung với reducer)
type SocketAction = {
    type: typeof SOCKET_PAYLOAD_TYPES.NOTIFICATION;
    payload: any;
};

type SocketDispatch = Dispatch<SocketAction>;

const useRealtimeEvents = (dispatch: SocketDispatch): void => {
    const { addIncomingMessage } = useMessageCacheContext();
    const { updateLastMessage } = useConversationContext();

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
    }, [dispatch, addIncomingMessage, updateLastMessage]);
};

export default useRealtimeEvents;
