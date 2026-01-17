import { useState, useRef } from 'react';
import conversationApi from '~/api/chat/conversationApi';

// 1. Định nghĩa Interface cho Conversation
export interface Conversation {
    _id: string;
    updatedAt: string;
    // Thêm các fields khác của bạn vào đây
    lastMessage?: string;
    participants?: any[];
}

// 2. Interface cho Cursor
interface Cursor {
    updatedAt: string;
    _id: string;
}

// 3. Interface cho Params gửi lên API
interface FetchParams {
    limit: number;
    cursorUpdatedAt?: string;
    cursorId?: string;
}

const LIMIT = 10;

export default function useGetAllConversations() {
    const [loading, setLoading] = useState<boolean>(false);

    // Sử dụng kiểu dữ liệu cho useRef
    const cursorRef = useRef<Cursor | null>(null);

    const fetchConversations = async (): Promise<Conversation[] | undefined> => {
        setLoading(true);
        try {
            const params: FetchParams = {
                limit: LIMIT,
            };

            if (cursorRef.current) {
                params.cursorUpdatedAt = cursorRef.current.updatedAt;
                params.cursorId = cursorRef.current._id;
            }

            const res = await conversationApi.getAll(params);

            // Lấy data từ response (giả sử cấu trúc là res.data.data)
            const conversations: Conversation[] = res.data.data;

            // cập nhật cursor mới dựa trên mảng data nhận được
            if (conversations && conversations.length > 0) {
                const last = conversations[conversations.length - 1];
                cursorRef.current = {
                    updatedAt: last.updatedAt,
                    _id: last._id,
                };
            }

            return conversations;
        } catch (error) {
            console.error('Fetch conversations error:', error);
            return undefined;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        fetchConversations,
    };
}
