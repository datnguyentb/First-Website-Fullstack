import { useEffect, useState } from 'react';
import messageApi from '~/api/chat/messageApi';
import { useMessageCacheContext } from '~/contexts';

export default function useGetMessages(conversationId) {
    const { messages, setMessages } = useMessageCacheContext();
    const [loading, setLoading] = useState(true);

    const currentMessages = conversationId ? messages[conversationId]?.messages || [] : [];

    useEffect(() => {
        if (!conversationId) return;
        if (messages[conversationId]) return; // đã có cache

        const fetchMessages = async () => {
            setLoading(true);
            try {
                const res = await messageApi.getMessages(conversationId);
                setMessages(conversationId, res.data.message, false);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [conversationId]);

    return {
        messages: currentMessages,
        loading,
    };
}
