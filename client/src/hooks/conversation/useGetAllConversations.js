import { useEffect, useState } from 'react';
import conversationApi from '~/api/chat/conversationApi';

export default function useGetAllConversations() {
    const [conversationsList, setConversationsList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log('🔄 useGetAllConversations - userId:');
        const getAllConversations = async () => {
            setLoading(true);

            try {
                const res = await conversationApi.getAllConversations();
                console.log('✅ Load conversation thành công:', res.data);
                setConversationsList(res.data.conversation);
            } catch (err) {
                console.error('❌ Lỗi load conversation:', err);
            } finally {
                setLoading(false);
            }
        };

        getAllConversations();
    }, []);

    return { conversationsList, setConversationsList, loading };
}
