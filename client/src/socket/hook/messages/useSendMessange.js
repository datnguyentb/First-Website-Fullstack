import { useSocketContext } from '~/contexts';

export default function useSendMessage() {
    const { socket } = useSocketContext();

    const sendMessage = (conversationId, messagePayload) => {
        if (!socket) {
            console.error('❌ Socket not connected');
            return;
        }

        if (!conversationId) {
            console.error('❌ Missing conversationId');
            return;
        }

        if (!messagePayload?.content?.trim()) {
            console.warn('⚠️ Empty message');
            return;
        }

        const payload = {
            ...messagePayload,
            conversation: conversationId,
        };

        socket.emit('sendMessage', payload);
    };

    return { sendMessage };
}
