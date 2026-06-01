import classNames from 'classnames/bind';
import styles from './Comments.module.scss';
import { Img } from '~/components';
import { timeAgo } from '~/utils/dateUtils';

const cx = classNames.bind(styles);

const getRandomDateInLastWeek = () => {
    const now = new Date();
    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
    const randomMs = Math.floor(Math.random() * oneWeekInMs);
    return new Date(now.getTime() - randomMs);
};

function CommentItem({ item }) {
    return (
        <div className={cx('comment-item')}>
            <div className={cx('comment-avatar')}>
                <Img src={item.avatar} />
            </div>
            <div className={cx('comment-body')}>
                <div className={cx('comment-content')}>
                    <span className={cx('comment-user')}>{item.user}</span>
                    <p className={cx('comment-text')}>{item.text}</p>
                </div>
                <div className={cx('comment-footer')}>
                    <span className={cx('comment-time')}>{timeAgo(getRandomDateInLastWeek())}</span>
                    <span className={cx('comment-reaction')}>Like</span>
                    <span className={cx('comment-reply')}>Reply</span>
                </div>
            </div>
        </div>
    );
}

export default CommentItem;
