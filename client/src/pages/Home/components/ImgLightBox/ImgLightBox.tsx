import classNames from 'classnames/bind';
import styles from './ImgLightBox.module.scss';
import { Img, UserHeader } from '~/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faClose, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import baseUrl from '~/helper/baseUrl';
import { timeAgo } from '~/utils/dateUtils';
import Comments from '../Comments/Comments';
import AddCommentInput from '../Comments/AddCommentInput';
import MediaSection from './components/MediaSection';

const cx = classNames.bind(styles);

interface ImgLightBoxProps {
    onClose: () => void;
    currentImageIndex: number;
    setCurrentImageIndex: (index: number) => void;
    post: {
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
