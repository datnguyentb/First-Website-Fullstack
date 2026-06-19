import classNames from 'classnames/bind';
import styles from './Comments.module.scss';
import { Img } from '~/components';
import { timeAgo } from '~/utils/dateUtils';
import { memo, useState } from 'react';
import AddCommentInput from './AddCommentInput';
import baseUrl from '~/helper/baseUrl';
import useSendComment from '~/socket/hook/post/useSendComment';

const cx = classNames.bind(styles);

function CommentItem({ item }: { item: any }) {
    const [isRepliesVisible, setIsRepliesVisible] = useState(false);
    const { sendComment } = useSendComment();

    const handleSubmit = (content: string) => {
        const newReply = {
            post: item.post,
            parentCommentId: item._id,
            content,
        };

        sendComment(item.post, newReply);
        setIsRepliesVisible(false);
    };

    return (
        <>
            <div className={cx('comment-item')}>
                <div className={cx('comment-avatar')}>
                    <Img src={baseUrl(item.user.avatar)} />
                </div>

                <div className={cx('comment-body')}>
                    <div className={cx('comment-content')}>
                        <span className={cx('comment-user')}>
                            {item.user.firstName} {item.user.lastName}
                        </span>

                        <p className={cx('comment-text')}>{item.content}</p>
                    </div>

                    <div className={cx('comment-footer')}>
                        <span className={cx('comment-time')}>{timeAgo(item.createdAt)}</span>

                        <span className={cx('comment-reaction')}>Like</span>

                        <span
                            className={cx('comment-reply', {
                                active: isRepliesVisible,
                            })}
                            onClick={() => {
                                setIsRepliesVisible((prev) => !prev);
                            }}
                        >
                            {isRepliesVisible ? 'Cancel' : 'Reply'}
                        </span>
                    </div>
                </div>
            </div>
            {isRepliesVisible && (
                <div className={cx('add-reply-input')}>
                    <AddCommentInput onSubmit={handleSubmit} placeholder="Write a reply..." />
                </div>
            )}
        </>
    );
}

export default memo(CommentItem);
