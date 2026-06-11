import classNames from 'classnames/bind';
import styles from './ImgLightBox.module.scss';
import { UserHeader } from '~/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Comments from '../Comments/Comments';
import MediaSection from './components/MediaSection';
import FooterSection from './components/FooterSection';
import { useState } from 'react';

const cx = classNames.bind(styles);

interface ImgLightBoxProps {
    onClose: () => void;
    currentImageIndex: number;
    setCurrentImageIndex: (index: number) => void;
    post: {
        _id: string;
        images: string[];
        author: {
            _id: string;
            fullName?: string;
            firstName?: string;
            lastName?: string;
            avatar: string;
        };
        privacy: 'Public' | 'Friends' | 'Only Me' | null;
        createdAt: string;
        content: string;
    };
}

function ImgLightBox({ onClose, currentImageIndex, setCurrentImageIndex, post }: ImgLightBoxProps) {
    const [comments, setComments] = useState<string[]>([]);
    const isPostImagesEmpty = !post.images || post.images.length === 0;

    console.log('Post data in ImgLightBox:', post);

    return (
        <div className={cx('lightbox-overlay')}>
            <div className={cx('lightbox-container', { 'no-images': isPostImagesEmpty })}>
                {/* PHẦN TRÁI: HIỂN THỊ MEDIA */}
                <div className={cx('media-section')}>
                    <MediaSection
                        currentImageIndex={currentImageIndex}
                        setCurrentImageIndex={setCurrentImageIndex}
                        post={post}
                    />
                </div>

                {/* PHẦN PHẢI: CHI TIẾT & BÌNH LUẬN */}
                <div className={cx('side-panel')}>
                    <button className={cx('close-all')} onClick={onClose}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>

                    <div className={cx('panel-header')}>
                        <UserHeader
                            userInfor={post.author}
                            createdAt={post.createdAt}
                            handleClickUserProfile={() => {}}
                            type="post"
                            privacy={post.privacy}
                        />
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
                        <FooterSection postId={post?._id} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImgLightBox;
