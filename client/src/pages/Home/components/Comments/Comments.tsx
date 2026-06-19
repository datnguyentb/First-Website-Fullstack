import classNames from 'classnames/bind';
import styles from './Comments.module.scss';
import CommentItem from './CommentItem';
import { buildCommentTree, CommentTreeNode, FlatComment } from '../../helper/buildCommentTree';
import { useGetAllComments } from '~/hooks/comment/useGetAllComments';
import useJoinPostComments from '~/socket/hook/post/useJoinPostComents';
import { useEffect, useState } from 'react';
import { addCommentToTree } from '../../helper/addCommentToTree';
import { getSocket } from '~/socket/socket';

const cx = classNames.bind(styles);

// Tách hàm renderComments ra ngoài hoặc giữ nguyên nhưng cần ép kiểu CSS hợp lệ
const renderComments = (comments: CommentTreeNode[], depth = 0, parentCommentId: string | null = null) => {
    return comments.map((item) => (
        <div
            key={item._id}
            className={cx('comment-wrapper', {
                'reply-comment': depth > 0,
            })}
            // Ép kiểu "as React.CSSProperties" để TypeScript không báo lỗi dòng này
            style={{ '--depth': depth } as React.CSSProperties}
        >
            <CommentItem item={item} parentCommentId={parentCommentId} />

            <div className={cx('comment-replies-container')}>
                {item.replies?.length > 0 && renderComments(item.replies, depth + 1, item._id)}
            </div>
        </div>
    ));
};

function Comments({ postId }: { postId: string }) {
    const [commentTree, setCommentTree] = useState<CommentTreeNode[]>([]);
    const { loading, comments } = useGetAllComments(postId);

    // Luôn join phòng tương ứng với postId hiện tại
    useJoinPostComments(postId);

    // Xử lý lắng nghe Realtime từ Socket
    useEffect(() => {
        const socket = getSocket();
        if (!socket || !postId) return;

        const handleNewComment = (newComment: FlatComment) => {
            if (newComment.post !== postId) return;

            setCommentTree((prevTree) => addCommentToTree(prevTree, newComment));
        };

        socket.on(`post_comments:${postId}`, handleNewComment);

        return () => {
            socket.off(`post_comments:${postId}`, handleNewComment);
        };
    }, [postId]);

    useEffect(() => {
        if (comments) {
            setCommentTree(buildCommentTree(comments));
        } else {
            setCommentTree([]);
        }
    }, [comments]);

    if (loading) {
        return <div className={cx('loading-container')}>Loading comments...</div>;
    }

    return <div className={cx('comment-list')}>{renderComments(commentTree)}</div>;
}

export default Comments;
