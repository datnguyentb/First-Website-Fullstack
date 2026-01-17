import { useState } from 'react';
import conversationApi from '~/api/chat/conversationApi';

export default function useGetConversationDetail() {
    const [loading, setLoading] = useState<boolean>(true);

    const getDetail = async (conversationId: string) => {
        // Chặn nếu không có ID để tránh gọi API lỗi
        if (!conversationId) return null;

        setLoading(true);
        try {
            const res = await conversationApi.getDetail(conversationId);
            return res.data;
        } catch (error) {
            console.error('Fetch conversation detail error:', error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        getDetail,
    };
}
