import classNames from 'classnames/bind';
import styles from './ImgLightBox.module.scss';
import { UserHeader } from '~/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Comments from '../Comments/Comments';
import MediaSection from './components/MediaSection';
import FooterSection from './components/FooterSection';

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
    const isPostImagesEmpty = !post.images || post.images.length === 0;

    return (
        <div
            className={cx('lightbox-overlay', 'w-[90vw] h-[90vh] flex justify-center items-center')}
            onClick={(e) => {
                onClose();
            }}
        >
            <div
                className={cx(
                    'lightbox-container',
                    'flex flex-col lg:flex-row w-full h-full bg-black rounded-[12px] overflow-hidden',
                    {
                        'no-images': isPostImagesEmpty,
                    },
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {/* PHẦN TRÁI: HIỂN THỊ MEDIA */}
                {isPostImagesEmpty ? (
                    <></>
                ) : (
                    <div className={cx('media-section')}>
                        <MediaSection
                            currentImageIndex={currentImageIndex}
                            setCurrentImageIndex={setCurrentImageIndex}
                            post={post}
                        />
                    </div>
                )}

                {/* PHẦN PHẢI: CHI TIẾT & BÌNH LUẬN */}
                <div className={cx('side-panel', 'w-full lg:w-[30%] h-[60%] lg:h-full')}>
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
                            <Comments postId={post?._id} />
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
