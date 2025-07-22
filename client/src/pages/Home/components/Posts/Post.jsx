import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import styles from './Post.module.scss';
import UserProfile from '~/components/UserProfile/index.jsx';
import postApi from '~/api/postApi';
import { useUser } from '~/contexts/useUser';
import PostHeader from './PostHeader';
import PostMoreAction from './PostMoreAction';
import PostContent from './PostContent';
import PostStatus from './PostStatus';
import PostActions from './PostActions';
import { usePost } from './usePost';

const cx = classNames.bind(styles);

// =================== COMPONENT ===================
function Post({ post, setPosts }) {
    const { user } = useUser();
    //Lấy useEffect và useState
    const {
        userInfor,
        liked,
        setLiked,
        likeCount,
        setLikeCount,
        burstVisible,
        setBurstVisible,
        showUserProfile,
        setShowUserProfile,
        settingVisible,
        setSettingVisible,
    } = usePost(post, user);

    //Click nút like
    const handleClickLike = async () => {
        try {
            const res = await postApi.likePost(post._id);
            const updatedPost = res.data.data;

            const isNowLiked = !liked;
            setLiked(isNowLiked);
            setLikeCount(updatedPost.likeCount);

            if (setPosts) {
                setPosts((prevPosts) => prevPosts.map((p) => (p._id === post._id ? updatedPost : p)));
            }

            if (isNowLiked) {
                setBurstVisible(true);
                setTimeout(() => setBurstVisible(false), 600);
            }
        } catch (error) {
            console.error('Like error:', error);
        }
    };

    //toggleSetting thì ẩn và hiển
    const handleToggleSetting = () => setSettingVisible((prev) => !prev);

    //Ấn ra ngoài ẩn setting
    const handleClickOutsideSetting = () => setSettingVisible(false);

    //Close Profile
    const handleCloseProfile = () => setShowUserProfile(false);

    // ========== SAFEGUARD ==========
    if (!user) return null;

    // =================== RENDER ===================
    return (
        <div className={cx('wrapper', 'mt-5')}>
            {showUserProfile && <UserProfile onClose={handleCloseProfile} userId={post.authorId._id} />}

            {/* Post Header */}
            <div className={cx('d-flex', 'justify-content-between')}>
                <PostHeader setShowUserProfile={setShowUserProfile} userInfor={userInfor} post={post} />
                <PostMoreAction
                    settingVisible={settingVisible}
                    handleClickOutsideSetting={handleClickOutsideSetting}
                    handleToggleSetting={handleToggleSetting}
                    post={post}
                />
            </div>

            {/* Post Content */}
            <PostContent post={post} />

            {/* Stats */}
            <PostStatus likeCount={likeCount} post={post} />

            {/* Actions */}
            <PostActions handleClickLike={handleClickLike} liked={liked} burstVisible={burstVisible} />
        </div>
    );
}

// ✅ Tối ưu hiệu suất: chỉ re-render khi prop post thay đổi thực sự
export default Post;
