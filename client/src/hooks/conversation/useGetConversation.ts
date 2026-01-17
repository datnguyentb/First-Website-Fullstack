import { useState } from 'react';
import conversationApi from '~/api/chat/conversationApi';

export default function useGetConversation() {
    const [loading, setLoading] = useState<boolean>(false);

    const getOrCreateConversation = async (userId: string) => {
        if (!userId) return;

        setLoading(true);
        try {
            const res = await conversationApi.getOrCreate(userId);
            return res.data.conversation;
        } catch (err) {
            console.error('❌ Lỗi load conversation:', err);
        } finally {
            setLoading(false);
        }
    };

    return { getOrCreateConversation, loading };
}
