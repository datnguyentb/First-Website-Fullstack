import classNames from 'classnames/bind';
import styles from './Post.module.scss';

const cx = classNames.bind(styles);
function PostActions({ handleClickLike, liked, burstVisible }) {
    return (
        <div className={cx('post-actions', 'd-flex')}>
            <button
                className={cx('btn', { liked }, 'd-flex', 'align-items-end', 'justify-content-center')}
                onClick={handleClickLike}
            >
                <div className={cx('heart-btn')}>
                    <span className={cx('heart-icon')}>{liked ? '❤️' : '🤍'}</span>
                    {burstVisible && (
                        <div className={cx('burst')}>
                            <span>💖</span>
                            <span>💖</span>
                        </div>
                    )}
                </div>
                <span className={cx('ms-2')}>{liked ? 'Liked' : 'Like'}</span>
            </button>

            <button className={cx('btn', 'd-flex', 'align-items-end', 'justify-content-center')}>
                <div className={cx('coment-btn')}>💬</div>
                <span className={cx('ms-2')}>Comments</span>
            </button>

            <button className={cx('btn', 'd-flex', 'align-items-end', 'justify-content-center')}>
                <div>📤</div>
                <span className={cx('ms-2')}>Share</span>
            </button>
        </div>
    );
}

export default PostActions;
