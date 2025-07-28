import { useState } from 'react';

export function useAdminPost() {
    const [dialog, setDialog] = useState({
        show: false,
        title: '',
        confirmText: '',
        reasonTitle: '',
        sendToUser: false,
        onConfirm: () => {},
    });

    const [postId, setPostId] = useState('');
    const [isShowPostDetail, setIsShowPostDetail] = useState(false);
    const [postDetail, setPostDetail] = useState(null);
    const [postIndexActive, setPostIndexActive] = useState(null);

    return {
        postId,
        setPostId,
        dialog,
        setDialog,
        isShowPostDetail,
        setIsShowPostDetail,
        postDetail,
        setPostDetail,
        postIndexActive,
        setPostIndexActive,
    };
}
