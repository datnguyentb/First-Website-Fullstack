import classNames from 'classnames/bind';
import styles from './Comments.module.scss';
import { Img } from '~/components';
import { timeAgo } from '~/utils/dateUtils';
import { memo, useState } from 'react';
import AddCommentInput from './AddCommentInput';

const cx = classNames.bind(styles);

const getRandomDateInLastWeek = () => {
    const now = new Date();
    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
    const randomMs = Math.floor(Math.random() * oneWeekInMs);

    return new Date(now.getTime() - randomMs);
};

function CommentItem({ item, parentCommentId }: { item: any; parentCommentId: string | null }) {
    const [isRepliesVisible, setIsRepliesVisible] = useState(false);

    const handleSubmit = (content: string) => {
        const newReply = {
            post: item.post,
            parentCommentId,
            content,
        };

        console.log('Submitting new reply:', newReply);

        // Gọi API để tạo bình luận mới
    };

    return (
        <>
            <div className={cx('comment-item')}>
                <div className={cx('comment-avatar')}>
                    <Img src={item.user.avatar} />
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
