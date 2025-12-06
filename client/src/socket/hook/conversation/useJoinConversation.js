import { useEffect } from 'react';
import { useSocketContext } from '~/contexts';

export default function useJoinConversation(conversationId) {
    const { socket } = useSocketContext();

    useEffect(() => {
        if (!socket || !conversationId) return;

        console.log('📌 Join room:', conversationId);
        socket.emit('joinConversation', conversationId);

        return () => {
            console.log('🚪 Leave room:', conversationId);
            socket.emit('leaveConversation', conversationId);
        };
    }, [socket, conversationId]);
}
