// =================== IMPORT ===================
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Tippy from '@tippyjs/react';
import TippyHeadless from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import styles from './Post.module.scss';
import { Img } from '~/components';
import MoreSetting from './components/MoreSetting/MoreSetting';
import UserProfile from '~/components/UserProfile';
import postApi from '~/api/postApi';
import baseUrl from '~/helper/baseUrl';
import { useUser } from '~/contexts/useUser';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas, faEllipsis, faLock, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

const cx = classNames.bind(styles);
dayjs.extend(relativeTime);

// =================== COMPONENT ===================
function Post({ post, setPosts }) {
    const { user } = useUser();
    const [userInfor, setUserInfor] = useState({
        avatarUrl: post.authorId.avatarUrl,
        firstName: post.authorId.firstName,
        lastName: post.authorId.lastName,
    });

    // ========== STATE ==========
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likeCount || 0);
    const [burstVisible, setBurstVisible] = useState(false);
    const [showUserProfile, setShowUserProfile] = useState(false);
    const [settingVisible, setSettingVisible] = useState(false);

    // ========== DESTRUCTURING ==========
    const { authorId, content, images, createdAt, privacy, _id } = post;
    const timeAgo = dayjs(createdAt).fromNow();

    useEffect(() => {
        if (user && user._id === authorId._id) {
            setUserInfor({
                avatarUrl: user.avatarUrl,
                firstName: user.firstName,
                lastName: user.lastName,
            });
        }
    }, [user, authorId._id]);

    // ========== CHECK LIKED ==========
    useEffect(() => {
        if (user && post.likes) {
            setLiked(post.likes.some((likeUser) => likeUser._id === user._id));
        } else {
            setLiked(false);
        }
    }, [post.likes, user]);

    // ========== HANDLER: CLICK LIKE ==========
    const handleClickLike = async () => {
        try {
            const res = await postApi.likePost(_id);
            const updatedPost = res.data.data;

            const isNowLiked = !liked;
            setLiked(isNowLiked);
            setLikeCount(updatedPost.likeCount);

            if (setPosts) {
                setPosts((prevPosts) => prevPosts.map((p) => (p._id === _id ? updatedPost : p)));
            }

            if (isNowLiked) {
                setBurstVisible(true);
                setTimeout(() => setBurstVisible(false), 600);
            }
        } catch (error) {
            console.error('Like error:', error);
        }
    };

    // ========== UTILS ==========
    const renderMultilineText = (text) => text.split('\n').map((line, index) => <p key={index}>{line}</p>);

    const getPrivacyIcon = () => {
        switch (privacy) {
            case 'private':
                return <FontAwesomeIcon icon={faLock} />;
            case 'friends':
                return <FontAwesomeIcon icon={faUserGroup} />;
            default:
                return <FontAwesomeIcon icon={faEarthAmericas} />;
        }
    };

    const formatDateTimeFullEN = (isoString) => {
        const date = new Date(isoString);
        return format(date, "EEEE, MMMM d, yyyy 'at' HH:mm", { locale: enUS });
    };

    const handleToggleSetting = () => setSettingVisible((prev) => !prev);
    const handleClickOutsideSetting = () => setSettingVisible(false);
    const handleCloseProfile = () => setShowUserProfile(false);

    // ========== SAFEGUARD ==========
    if (!user) return null;

    // =================== RENDER ===================
    return (
        <div className={cx('wrapper', 'mt-5')}>
            {showUserProfile && <UserProfile onClose={handleCloseProfile} userId={authorId._id} />}

            {/* Post Header */}
            <div className={cx('post-header', 'd-flex', 'align-items-center', 'justify-content-between')}>
                <div className={cx('d-flex', 'align-items-center')}>
                    <div className={cx('avatar-img')}>
                        <Img src={baseUrl(userInfor.avatarUrl)} alt="Avatar" className={cx('avatar')} />
                    </div>
                    <div className={cx('ms-3')}>
                        <h3 onClick={() => setShowUserProfile(true)} className={cx('name')}>
                            {`${userInfor.firstName} ${userInfor.lastName}`}
                        </h3>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <span className={cx('time')} title={formatDateTimeFullEN(createdAt)}>
                                {timeAgo}
                            </span>
                            <Tippy content={privacy} theme="light">
                                <span className={cx('privacy', 'ms-2')}>{getPrivacyIcon()}</span>
                            </Tippy>
                        </div>
                    </div>
                </div>

                {/* More Setting (3 chấm) */}
                <TippyHeadless
                    placement="top-end"
                    interactive
                    offset={[0, -40]}
                    visible={settingVisible}
                    onClickOutside={handleClickOutsideSetting}
                    render={(attrs, ref) => (
                        <div tabIndex="-1" ref={ref} {...attrs}>
                            <MoreSetting onClick={handleToggleSetting} id={_id} />
                        </div>
                    )}
                >
                    <div onClick={handleToggleSetting} className={cx('setting-icon')}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </TippyHeadless>
            </div>

            {/* Post Content */}
            <div className={cx('post-content')}>
                <div className={cx('post-text')}>{renderMultilineText(content)}</div>
                <div className={cx('post-images', `count-${images.length}`)}>
                    {images.map((imgUrl, index) => (
                        <div key={index} className={cx('image-wrapper', `image-${index}`)}>
                            <Img src={baseUrl(imgUrl)} alt={`post-image-${index}`} className={cx('post-image')} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className={cx('post-stats')}>
                <span className={cx('like-count')}>{likeCount} lượt thích</span>
                <span className={cx('comment-count')}>{post.commentCount} bình luận</span>
            </div>

            {/* Actions */}
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
                    <span className={cx('ms-2')}>Bình luận</span>
                </button>

                <button className={cx('btn', 'd-flex', 'align-items-end', 'justify-content-center')}>
                    <div>📤</div>
                    <span className={cx('ms-2')}>Chia sẻ</span>
                </button>
            </div>
        </div>
    );
}

// ✅ Tối ưu hiệu suất: chỉ re-render khi prop post thay đổi thực sự
export default Post;
