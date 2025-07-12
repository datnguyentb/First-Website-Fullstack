import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import { Img } from '~/components';
import { authBackground } from '~/assets/imgs/background';

const cx = classNames.bind(styles);

function Post({ likeCount = 5, commentCount = 2 }) {
    return (
        <div className={cx('wrapper', 'mt-5')}>
            <div className={cx('post-header', 'd-flex', 'align-items-center')}>
                <div className={cx('avatar-img')}>
                    <Img src={authBackground.mobile_login_1} alt="Avatar" className={cx('avatar')} />
                </div>
                <div className={cx('ms-3')}>
                    <h3 className={cx('name')}>Nguyen Tien Dat</h3>
                    <span className={cx('time')}>1 giờ trước</span>
                </div>
            </div>

            <div className={cx('post-content')}>
                <p className={cx('post-text')}>Thành quả nấu ăn cuối tuần 🍝</p>
                <div className={cx('post-images', 'one')}>
                    <Img src="https://picsum.photos/600/300?random=1" alt="post-image" className={cx('post-image')} />
                </div>
            </div>

            <div className={cx('post-stats')}>
                <span className={cx('like-count')}>{likeCount} thích</span>
                <span className={cx('comment-count')}>{commentCount} bình luận</span>
            </div>

            <div className={cx('post-actions')}>
                <button>❤️ Thích</button>
                <button>💬 Bình luận</button>
                <button>📤 Chia sẻ</button>
            </div>
        </div>
    );
}

export default Post;
