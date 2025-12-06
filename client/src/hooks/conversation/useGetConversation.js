import { useEffect, useState } from 'react';
import conversationApi from '~/api/chat/conversationApi';

export default function useGetConversation(userId) {
    const [conversationInfo, setConversationInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userId) return;
        const getConversationInfo = async (userId) => {
            setLoading(true);

            try {
                const res = await conversationApi.getOrCreate(userId);
                setConversationInfo(res.data.conversation);
            } catch (err) {
                console.error('❌ Lỗi load conversation:', err);
            } finally {
                setLoading(false);
            }
        };

        getConversationInfo(userId);
    }, [userId]);

    return { conversationInfo, loading };
}
