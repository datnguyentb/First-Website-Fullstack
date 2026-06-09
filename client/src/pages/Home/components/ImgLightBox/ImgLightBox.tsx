import classNames from 'classnames/bind';
import styles from './ImgLightBox.module.scss';
import { Img } from '~/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faClose, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import baseUrl from '~/helper/baseUrl';
import { timeAgo } from '~/utils/dateUtils';
import { useState } from 'react';
import Comments from '../Comments/Comments';
import AddCommentInput from '../Comments/AddCommentInput';

const cx = classNames.bind(styles);

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
                            <Comments />
                        </>
                    </div>

                    <div className={cx('panel-footer')}>
                        <AddCommentInput
                            onSubmit={(commentText) => {
                                console.log('New comment:', commentText);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImgLightBox;
