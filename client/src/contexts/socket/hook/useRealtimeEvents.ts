import { useEffect, Dispatch } from 'react';
import { getSocket } from '~/socket/socket';
import { SocketEventData } from '../type';
import { SOCKET_EVENTS, SOCKET_PAYLOAD_TYPES } from '~/socket/socketTypes';
import { useConversationContext, useMessageCacheContext, useNotificationsContext, useToastContext } from '~/contexts';

// 👇 define action type (nên đặt chung với reducer)
type SocketAction = {
    type: typeof SOCKET_PAYLOAD_TYPES.NOTIFICATION;
    payload: any;
};

type SocketDispatch = Dispatch<SocketAction>;

const useRealtimeEvents = (dispatch: SocketDispatch): void => {
    const { addIncomingMessage } = useMessageCacheContext();
    const { updateLastMessage } = useConversationContext();
    const { addNewNotification } = useNotificationsContext();
    const { addToast } = useToastContext();

    useEffect(() => {
        const socket = getSocket();
        if (!socket) return;

        const handleRealtimeEvent = (data: SocketEventData) => {
            switch (data.event) {
                case SOCKET_PAYLOAD_TYPES.MESSAGE: {
                    const payload = data.data;
                    const conversationId = payload.conversation;
                    addIncomingMessage(conversationId, payload);
                    updateLastMessage(conversationId, payload);
                    break;
                }

                case SOCKET_PAYLOAD_TYPES.NOTIFICATION:
                    addNewNotification(data.data);
                    addToast(data.data);
                    break;
                default:
                    console.log('No event');
            }
        };

        socket.on(SOCKET_EVENTS.REALTIME_EVENT, handleRealtimeEvent);

        return () => {
            socket.off(SOCKET_EVENTS.REALTIME_EVENT, handleRealtimeEvent);
        };
    }, [dispatch, addIncomingMessage, updateLastMessage]);
};

export default useRealtimeEvents;
