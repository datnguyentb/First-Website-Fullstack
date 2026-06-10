import classNames from 'classnames/bind';
import styles from '../ImgLightBox.module.scss';
import { useState } from 'react';
import { Img } from '~/components';
import baseUrl from '~/helper/baseUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

interface MediaSectionProps {
    currentImageIndex: number;
    setCurrentImageIndex: (index: number) => void;
    post: {
        images: string[];
    };
}

function MediaSection({ currentImageIndex, setCurrentImageIndex, post }: MediaSectionProps) {
    const [direction, setDirection] = useState('next');

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
        <>
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
        </>
    );
}

export default MediaSection;
