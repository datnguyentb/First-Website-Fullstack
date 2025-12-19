import { useState, useRef } from 'react';
import conversationApi from '~/api/chat/conversationApi';

const LIMIT = 10;

export default function useGetAllConversations() {
    const [loading, setLoading] = useState(false);

    // lưu cursor hiện tại
    const cursorRef = useRef(null);

    const fetchConversations = async () => {
        setLoading(true);
        try {
            const params = {
                limit: LIMIT,
            };

            if (cursorRef.current) {
                params.cursorUpdatedAt = cursorRef.current.updatedAt;
                params.cursorId = cursorRef.current._id;
            }

            const res = await conversationApi.getAll(params);

            // cập nhật cursor mới
            if (res.length > 0) {
                const last = res[res.length - 1];
                cursorRef.current = {
                    updatedAt: last.updatedAt,
                    _id: last._id,
                };
            }
            return res.data.data;
        } catch (error) {
            console.error('Fetch conversations error:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        fetchConversations,
    };
}
