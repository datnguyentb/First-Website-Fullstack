import { useEffect, useState } from 'react';
import messageApi from '~/api/chat/messageApi';

export default function useGetMessages(conversationId) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!conversationId) return;

        const fetchMessages = async () => {
            setLoading(true);
            try {
                const res = await messageApi.getMessages(conversationId);
                setMessages(res.data);
            } catch (err) {
                console.error('❌ Lỗi load messages:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [conversationId]);

    return { messages, loading, setMessages };
}
