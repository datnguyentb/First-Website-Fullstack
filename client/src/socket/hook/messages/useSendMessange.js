import { useSocketContext, useUserContext } from '~/contexts';
import { useMessageCacheContext } from '~/contexts';

export default function useSendMessage() {
    const { socket } = useSocketContext();
    const { addPendingMessage } = useMessageCacheContext();
    const { user } = useUserContext();

    const sendMessage = (data) => {
        const { conversation = '', replyTo = null, attachments = null, content = '' } = data;
        if (!socket) return console.error('❌ Socket not connected');
        if (!conversation) return console.error('❌ Missing conversationId');

        const trimmed = content?.trim();
        if (!trimmed) return;

        const tempId = Date.now();

        const optimisticMessage = {
            _id: tempId,
            conversation,
            replyTo,
            attachments,
            sender: user,
            content: trimmed,
            status: 'pending',
            createdAt: new Date().toISOString(),
        };

        // 1️⃣ Update UI ngay
        addPendingMessage(conversation, optimisticMessage);

        // 2️⃣ Emit socket
        socket.emit('send-message', optimisticMessage);
    };

    return { sendMessage };
}
