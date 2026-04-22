import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import styles from './Post.module.scss';
import UserProfile from '~/components/UserProfile/index.jsx';
import { FloatingLayer } from '~/components';
import { ImgLightBox } from '../../components';
import { useUserContext } from '~/contexts';
import PostHeader from './PostHeader';
import PostMoreAction from './PostMoreAction';
import PostContent from './PostContent';
import PostActions from './PostActions';
import { usePost } from './usePost';
import useLikePost from '~/hooks/postInteraction/useLikePost';

const cx = classNames.bind(styles);

function Post({ post, setPosts }) {
    // ========== HOOKS ==========
    const { user } = useUserContext();

    // Function to like post
    const { likePost } = useLikePost();

    // Custom hook to manage post state
    const {
        isAuthor,
        userInfor,
        liked,
        setLiked,
        likeCount,
        setLikeCount,
        showUserProfile,
        setShowUserProfile,
        settingVisible,
        setSettingVisible,
        lightboxOpen,
        setLightboxOpen,
        currentImageIndex,
        setCurrentImageIndex,
    } = usePost(post, user);

    // ========== HANDLERS ==========
    const handleClickLike = async () => {
        try {
            const updatedPost = await likePost(post._id);

            const isNowLiked = !liked;
            setLiked(isNowLiked);
            setLikeCount(updatedPost.likeCount);

            if (setPosts) {
                setPosts((prevPosts) => prevPosts.map((p) => (p._id === post._id ? updatedPost : p)));
            }
        } catch (error) {
            console.error('Like error:', error);
        }
    };

    //show and hide menuSetting
    const handleToggleSetting = () => setSettingVisible((prev) => !prev);
    const handleClickOutsideSetting = () => setSettingVisible(false);

    //Close Profile
    const handleCloseProfile = () => setShowUserProfile(false);

    if (!user) return null;

    return (
        <>
            <div className={cx('wrapper', 'mt-5')}>
                {showUserProfile && (
                    <UserProfile
                        setShowUserProfile={setShowUserProfile}
                        onClose={handleCloseProfile}
                        userId={post.author._id}
                    />
                )}
                <div className={cx('d-flex', 'justify-content-between')}>
                    <PostHeader setShowUserProfile={setShowUserProfile} userInfor={userInfor} post={post} />
                    <PostMoreAction
                        settingVisible={settingVisible}
                        handleClickOutsideSetting={handleClickOutsideSetting}
                        handleToggleSetting={handleToggleSetting}
                        post={post}
                        isAuthor={isAuthor}
                    />
                </div>
                <PostContent
                    post={post}
                    currentImageIndex={currentImageIndex}
                    setCurrentImageIndex={setCurrentImageIndex}
                    lightboxOpen={lightboxOpen}
                    setLightboxOpen={setLightboxOpen}
                />
                <PostActions
                    handleClickLike={handleClickLike}
                    liked={liked}
                    likeCount={likeCount}
                    setLightboxOpen={setLightboxOpen}
                />
            </div>
            {lightboxOpen && (
                <FloatingLayer onClose={() => setLightboxOpen(false)}>
                    <ImgLightBox
                        onClose={() => setLightboxOpen(false)}
                        currentImageIndex={currentImageIndex}
                        setCurrentImageIndex={setCurrentImageIndex}
                        post={post}
                    />
                </FloatingLayer>
            )}
        </>
    );
}

export default Post;
