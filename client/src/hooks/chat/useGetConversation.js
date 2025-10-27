import { useState, useCallback } from 'react';
import conversationApi from '~/api/chat/conversationApi';

export default function useGetConversation() {
    const [conversation, setConversation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchConversation = useCallback(async (userId) => {
        if (!userId) return;

        setLoading(true);
        setError(null);
        try {
            const res = await conversationApi.getOrCreate(userId);
            console.log('fetchConversation response:');
            setConversation(res.data?.data);
            return res.data?.data;
        } catch (err) {
            console.error('fetchConversation error:', err);
            setError(err.response?.data || err.message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return { conversation, setConversation, loading, error, fetchConversation };
}
