import classNames from 'classnames/bind';
import styles from './ImgLightBox.module.scss';
import { Img } from '~/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faClose, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import baseUrl from '~/helper/baseUrl';
import { timeAgo } from '~/utils/dateUtils';
import { useState } from 'react';
import Comments from '../Comments/Comments';

const cx = classNames.bind(styles);

// Mockup dữ liệu bình luận NHIỀU LỚP (Cấu trúc cây dữ liệu)
const nestedComments = [
    {
        id: 1,
        user: 'Anh Tuấn',
        text: 'Giao diện nhìn xịn quá bạn ơi! 🚀',
        avatar: 'https://i.pravatar.cc/150?u=1',
        replies: [
            {
                id: 11,
                user: 'Minh Hoàng',
                text: 'Đúng vậy, đặc biệt là phần animation mượt mà cực kỳ.',
                avatar: 'https://i.pravatar.cc/150?u=3',
                replies: [
                    {
                        id: 111,
                        user: 'Anh Tuấn',
                        text: 'Chuẩn luôn, chủ thớt tối ưu CSS tốt thật.',
                        avatar: 'https://i.pravatar.cc/150?u=1',
                        replies: [],
                    },
                ],
            },
            {
                id: 12,
                user: 'Thùy Linh',
                text: 'Công nhận, mình cũng thích phong cách layout này.',
                avatar: 'https://i.pravatar.cc/150?u=4',
                replies: [],
            },
        ],
    },
    {
        id: 2,
        user: 'Bảo Ngọc',
        text: 'Màu sắc phối hợp hài hòa lắm.',
        avatar: 'https://i.pravatar.cc/150?u=2',
        replies: [
            {
                id: 21,
                user: 'Quốc Anh',
                text: 'Nhìn dịu mắt ghê, có hỗ trợ Dark Mode không ta?',
                avatar: 'https://i.pravatar.cc/150?u=5',
                replies: [],
            },
        ],
    },
    {
        id: 3,
        user: 'Lan Hương',
        text: 'Phần mobile responsive cần chỉnh lại một chút ở menu nhé.',
        avatar: 'https://i.pravatar.cc/150?u=8',
        replies: [],
    },
];

function ImgLightBox({ onClose, currentImageIndex, setCurrentImageIndex, post }) {
    const [direction, setDirection] = useState('next');

    const isPostImagesEmpty = !post.images || post.images.length === 0;

    // Xử lý chuyển ảnh
    const handleImagePreview = () => {
        setDirection('prev');
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        } else {
            setCurrentImageIndex(post.images.length - 1);
        }
    };

    const handleImageNext = () => {
        setDirection('next');
        if (currentImageIndex < post.images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        } else {
            setCurrentImageIndex(0);
        }
    };

    const getRandomDateInLastWeek = () => {
        const now = new Date();
        const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
        const randomMs = Math.floor(Math.random() * oneWeekInMs);
        return new Date(now.getTime() - randomMs);
    };

    // Hàm ĐỆ QUY render bình luận nhiều lớp
    const renderComments = (commentList, depth = 0) => {
        return commentList.map((item) => (
            <div
                key={item.id}
                className={cx('comment-wrapper', { 'reply-comment': depth > 0 })}
                style={{ '--depth': depth }}
            >
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
                            <span className={cx('comment-reaction')}>Thích</span>
                            <span className={cx('comment-reply')}>Trả lời</span>
                        </div>
                    </div>
                </div>

                {/* Nếu có câu trả lời, gọi lại chính hàm này và tăng depth lên 1 */}
                {item.replies && item.replies.length > 0 && (
                    <div className={cx('comment-replies-container')}>{renderComments(item.replies, depth + 1)}</div>
                )}
            </div>
        ));
    };

    return (
        <div className={cx('lightbox-overlay')}>
            <div className={cx('lightbox-container', { 'no-images': isPostImagesEmpty })}>
                {/* PHẦN TRÁI: HIỂN THỊ MEDIA */}
                <div className={cx('media-section')}>
                    <Img
                        key={currentImageIndex}
                        className={cx('main-img', direction === 'next' ? 'slide-next' : 'slide-prev')}
                        src={baseUrl(post.images[currentImageIndex])}
                    />

                    <ul className={cx('dots-container')}>
                        {post.images.map((_, index) => (
                            <li
                                key={index}
                                className={cx('dot-item', { active: index === currentImageIndex })}
                                onClick={() => setCurrentImageIndex(index)}
                            ></li>
                        ))}
                    </ul>

                    {post.images.length > 1 && (
                        <div className={cx('nav-btns')}>
                            <div className={cx('nav-btn', 'preview')} onClick={handleImagePreview}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </div>
                            <div className={cx('nav-btn', 'next')} onClick={handleImageNext}>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </div>
                        </div>
                    )}
                </div>

                {/* PHẦN PHẢI: CHI TIẾT & BÌNH LUẬN */}
                <div className={cx('side-panel')}>
                    <button className={cx('close-all')} onClick={onClose}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>

                    <div className={cx('panel-header')}>
                        <div className={cx('avatar-mock')}>
                            <Img src={baseUrl(post.author.avatar)} />
                        </div>
                        <div className={cx('user-info')}>
                            <span className={cx('username')}>
                                {post.author.fullName || `${post.author.firstName} ${post.author.lastName}`}
                            </span>
                            <span className={cx('time')}>{timeAgo(post.createdAt)}</span>
                        </div>
                    </div>

                    <div className={cx('scrollable-content')}>
                        <div className={cx('content-text')}>
                            <p>{post.content}</p>
                        </div>

                        <>
                            <Comments></Comments>
                        </>
                    </div>

                    <div className={cx('panel-footer')}>
                        <div className={cx('input-wrapper')}>
                            <input type="text" placeholder="Viết bình luận..." autoFocus={true} />
                        </div>
                        <button className={cx('send-btn')}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImgLightBox;
