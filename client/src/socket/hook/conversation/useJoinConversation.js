import { useEffect } from 'react';
import { useSocketContext } from '~/contexts';

export default function useJoinConversation(conversationId) {
    const { socket } = useSocketContext();

    useEffect(() => {
        if (!socket || !conversationId) return;

        socket.emit('joinConversation', conversationId);

        return () => {
            socket.emit('leaveConversation', conversationId);
        };
    }, [socket, conversationId]);
}
