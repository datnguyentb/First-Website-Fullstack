import { useState } from 'react';

export function useAdminPost() {
    const [postId, setPostId] = useState('');
    const [isShowPostDetail, setIsShowPostDetail] = useState(false);
    const [postDetail, setPostDetail] = useState(null);
    const [postIndexActive, setPostIndexActive] = useState(null);

    return {
        postId,
        setPostId,
        isShowPostDetail,
        setIsShowPostDetail,
        postDetail,
        setPostDetail,
        postIndexActive,
        setPostIndexActive,
    };
}
