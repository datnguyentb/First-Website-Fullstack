import classNames from 'classnames/bind';
import styles from './Post.module.scss';

const cx = classNames.bind(styles);

function PostStatus({ likeCount, post }) {
    return (
        <div className={cx('post-status')}>
            <span className={cx('like-count')}>{likeCount} likes</span>
            <span className={cx('comment-count')}>{post.commentCount} comments</span>
        </div>
    );
}

export default PostStatus;
