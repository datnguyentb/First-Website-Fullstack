import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function PostActions({ handleClickLike, liked, likeCount, setLightboxOpen }) {
    return (
        <div className={cx('post-actions', 'd-flex')}>
            <button
                className={cx('btn', { liked }, 'd-flex', 'align-items-end', 'justify-content-center')}
                onClick={handleClickLike}
            >
                <div className={cx('heart-btn')}>
                    <FontAwesomeIcon icon={faHeart} />
                </div>
                <span className={cx('ms-2')}>{likeCount}</span>
            </button>

            <button
                className={cx('btn', 'd-flex', 'align-items-end', 'justify-content-center')}
                onClick={() => setLightboxOpen(true)}
            >
                <div className={cx('coment-btn')}>
                    <FontAwesomeIcon icon={faComment} />
                </div>
                <span className={cx('ms-2')}>0</span>
            </button>

            <button className={cx('btn', 'd-flex', 'align-items-end', 'justify-content-center')}>
                <div className={cx('share-btn')}>
                    <FontAwesomeIcon icon={faShare} />
                </div>
            </button>
        </div>
    );
}

export default PostActions;
