import classNames from 'classnames/bind';
import styles from './Comments.module.scss';
import CommentItem from './CommentItem';
import { useEffect, useState } from 'react';
import { buildCommentTree, CommentTreeNode } from '../../helper/buildCommentTree';

const cx = classNames.bind(styles);

import { FlatComment } from '../../helper/buildCommentTree';
import { useGetAllComments } from '~/hooks/comment/useGetAllComments';

const renderComments = (comments: CommentTreeNode[], depth = 0, parentCommentId: string | null = null) => {
    return comments.map((item) => (
        <div
            key={item._id}
            className={cx('comment-wrapper', {
                'reply-comment': depth > 0,
            })}
            style={{ '--depth': depth }}
        >
            <CommentItem item={item} parentCommentId={parentCommentId} />

            <div className={cx('comment-replies-container')}>
                {item.replies?.length > 0 && renderComments(item.replies, depth + 1, item._id)}
            </div>
        </div>
    ));
};

function Comments({ postId }: { postId: string }) {
    const { loading, comments } = useGetAllComments(postId);

    if (loading) {
        return <div>Loading comments...</div>;
    }

    return <div className={cx('comment-list')}>{renderComments(comments)}</div>;
}

export default Comments;
