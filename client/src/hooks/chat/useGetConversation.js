import { useState, useCallback } from 'react';
import conversationApi from '~/api/chat/conversationApi';

export default function useGetConversation() {
    const [loading, setLoading] = useState(false);

    const fetchConversation = useCallback(async (userId) => {
        if (!userId) return;

        setLoading(true);
        try {
            const res = await conversationApi.getOrCreate(userId);
            return res.data;
        } catch (err) {
            console.error('fetchConversation error:', err);
            return err.response?.data || err.message;
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, fetchConversation };
}
