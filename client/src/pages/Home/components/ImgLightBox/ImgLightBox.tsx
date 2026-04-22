import classNames from 'classnames/bind';
import styles from './ImgLightBox.module.scss';
import { Img } from '~/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faClose, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import baseUrl from '~/helper/baseUrl';
import { timeAgo } from '~/utils/dateUtils';
import { useState } from 'react';

const cx = classNames.bind(styles);

// Mockup dữ liệu bình luận
const comments = [
    { id: 1, user: 'Anh Tuấn', text: 'Giao diện nhìn xịn quá bạn ơi! 🚀', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, user: 'Bảo Ngọc', text: 'Màu sắc phối hợp hài hòa lắm.', avatar: 'https://i.pravatar.cc/150?u=2' },
    {
        id: 3,
        user: 'Minh Hoàng',
        text: 'Cho mình xin source code tham khảo được không?',
        avatar: 'https://i.pravatar.cc/150?u=3',
    },
    { id: 4, user: 'Thùy Linh', text: 'Web chạy mượt quá, tối ưu tốt đấy!', avatar: 'https://i.pravatar.cc/150?u=4' },
    { id: 5, user: 'Quốc Anh', text: 'Layout này trông rất chuyên nghiệp.', avatar: 'https://i.pravatar.cc/150?u=5' },
    {
        id: 6,
        user: 'Hồng Hạnh',
        text: 'Thích cách bạn làm animation, mượt ghê.',
        avatar: 'https://i.pravatar.cc/150?u=6',
    },
    {
        id: 7,
        user: 'Đức Huy',
        text: 'Cảm ơn bạn đã chia sẻ kiến thức hữu ích này.',
        avatar: 'https://i.pravatar.cc/150?u=7',
    },
    {
        id: 8,
        user: 'Lan Hương',
        text: 'Phần mobile responsive cần chỉnh lại một chút ở menu nhé.',
        avatar: 'https://i.pravatar.cc/150?u=8',
    },
    { id: 9, user: 'Văn Nam', text: 'Đỉnh quá thớt ơi!', avatar: 'https://i.pravatar.cc/150?u=9' },
    {
        id: 10,
        user: 'Thanh Thảo',
        text: 'Bạn dùng thư viện gì để làm biểu đồ vậy?',
        avatar: 'https://i.pravatar.cc/150?u=10',
    },
    {
        id: 11,
        user: 'Gia Bảo',
        text: 'Tuyệt vời, hóng các bài viết tiếp theo.',
        avatar: 'https://i.pravatar.cc/150?u=11',
    },
    {
        id: 12,
        user: 'Kim Ngân',
        text: 'Giao diện thân thiện với người dùng.',
        avatar: 'https://i.pravatar.cc/150?u=12',
    },
    {
        id: 13,
        user: 'Tiến Dũng',
        text: 'Sáng tạo quá, mình thích phong cách này.',
        avatar: 'https://i.pravatar.cc/150?u=13',
    },
    {
        id: 14,
        user: 'Phương Mai',
        text: 'Bạn có nhận làm dự án freelance không?',
        avatar: 'https://i.pravatar.cc/150?u=14',
    },
    {
        id: 15,
        user: 'Hoàng Long',
        text: 'Code sạch sẽ, dễ đọc, rất đáng học hỏi.',
        avatar: 'https://i.pravatar.cc/150?u=15',
    },
    {
        id: 16,
        user: 'Yến Nhi',
        text: 'Giao diện dark mode nhìn sang hẳn luôn.',
        avatar: 'https://i.pravatar.cc/150?u=16',
    },
    { id: 17, user: 'Văn Hậu', text: 'Tính năng này rất thực tế.', avatar: 'https://i.pravatar.cc/150?u=17' },
    { id: 18, user: 'Thu Hà', text: '10 điểm không có nhưng!', avatar: 'https://i.pravatar.cc/150?u=18' },
    {
        id: 19,
        user: 'Minh Quân',
        text: 'Đang cần tìm mẫu như thế này, cảm ơn bạn.',
        avatar: 'https://i.pravatar.cc/150?u=19',
    },
    {
        id: 20,
        user: 'Diệu Thúy',
        text: 'Giao diện đẹp, trải nghiệm người dùng tốt.',
        avatar: 'https://i.pravatar.cc/150?u=20',
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
        setDirection('next'); // Bấm tiếp theo thì trượt từ phải qua
        if (currentImageIndex < post.images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        } else {
            setCurrentImageIndex(0);
        }
    };

    // Hàm tạo ngày ngẫu nhiên trong vòng 7 ngày qua (dùng để mockup thời gian bình luận)
    const getRandomDateInLastWeek = () => {
        const now = new Date();
        // 7 ngày * 24 giờ * 60 phút * 60 giây * 1000 miligiây
        const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
        const randomMs = Math.floor(Math.random() * oneWeekInMs);

        return new Date(now.getTime() - randomMs);
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

                    {/* Nút điều hướng */}
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

                    {/* Header: Thông tin người đăng */}
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

                    {/* Vùng nội dung có thể cuộn (Caption + Comments) */}
                    <div className={cx('scrollable-content')}>
                        <div className={cx('content-text')}>
                            <p>{post.content}</p>
                        </div>

                        <div className={cx('comment-list')}>
                            {/* Mockup bình luận */}
                            {comments.map((item) => (
                                <div key={item.id} className={cx('comment-item')}>
                                    <div className={cx('comment-avatar')}>
                                        <Img src={item.avatar} />
                                    </div>
                                    <div className={cx('comment-body')}>
                                        <div className={cx('comment-content')}>
                                            <span className={cx('comment-user')}> {item.user}</span>
                                            <p className={cx('comment-text')}>{item.text}</p>
                                        </div>
                                        <div className={cx('comment-footer')}>
                                            <span className={cx('comment-time')}>
                                                {timeAgo(getRandomDateInLastWeek())}
                                            </span>
                                            <span className={cx('comment-reaction')}>Thích</span>
                                            <span className={cx('comment-reply')}>Trả lời</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer: Ô nhập bình luận */}
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
