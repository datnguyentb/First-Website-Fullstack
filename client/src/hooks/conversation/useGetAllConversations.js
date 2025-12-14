import { useEffect, useState, useRef } from 'react';
import conversationApi from '~/api/chat/conversationApi';

const LIMIT = 10;

export default function useGetAllConversations() {
    const [conversationsList, setConversationsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // lưu cursor hiện tại
    const cursorRef = useRef(null);

    const fetchConversations = async () => {
        if (loading || !hasMore) return;

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

            // lần đầu: replace, lần sau: append
            setConversationsList((prev) => (cursorRef.current ? [...prev, ...res.data] : res.data));

            // cập nhật cursor mới
            if (res.length > 0) {
                const last = res[res.length - 1];
                cursorRef.current = {
                    updatedAt: last.updatedAt,
                    _id: last._id,
                };
            }

            // nếu trả về ít hơn LIMIT → hết dữ liệu
            if (res.length < LIMIT) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Fetch conversations error:', error);
        } finally {
            setLoading(false);
        }
    };

    // load lần đầu
    useEffect(() => {
        if (conversationsList.length === 0) {
            fetchConversations();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // dùng khi cần reload toàn bộ (vd: logout, switch account)
    const resetAndReload = () => {
        cursorRef.current = null;
        setHasMore(true);
        setConversationsList([]);
        fetchConversations();
    };

    return {
        conversationsList,
        setConversationsList,
        loading,
        hasMore,
        fetchMore: fetchConversations,
        resetAndReload,
    };
}
