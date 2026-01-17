import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';

import EditProfile from './subcomponents/EditProfile';
import UserProfileHeader from './UserProfileHeader.jsx';
import UserInfoCard from './UserInfoCard.jsx';
import UserActionButtons from './UserActionButtons.jsx';
import { Button, FloatingLayer, Loading } from '~/components';
import { useUserProfile } from './useUserProfile.js';
import useGetFriendshipStatus from '~/hooks/friendShip/useGetFriendshipStatus';
import useSendFriendRequest from '~/hooks/friendShip/useSendFriendRequest';
import useUnfollowUser from '~/hooks/friendShip/useUnfollowUser';
import { useChatWidgetContext } from '~/contexts';
import useGetConversation from '~/hooks/conversation/useGetConversation';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function UserProfile({ onClose, userId, setShowUserProfile }) {
    const { loading, userDisplay, isUserLogin, showEditProfile, setShowEditProfile } = useUserProfile(userId);
    const { friendshipStatus, setFriendshipStatus } = useGetFriendshipStatus(userId);
    const { setIsOpenChatWidget, setConversationId } = useChatWidgetContext();
    const { getOrCreateConversation } = useGetConversation();

    const { sendFriendRequest, loading: followLoading } = useSendFriendRequest();
    const { unfollowUser } = useUnfollowUser();

    // Toggle edit profile
    const handleToggleEdit = () => setShowEditProfile((prev) => !prev);
    const handleCloseEdit = () => setShowEditProfile(false);

    // Follow user
    const handleFollowUser = async () => {
        const res = await sendFriendRequest(userId);
        if (res?.succes) {
            setFriendshipStatus(res.data.status);
        } else {
            toast.error(res.data.message);
        }
    };

    // Unfollow user
    const handleUnfollowUser = async () => {
        const res = await unfollowUser(userId);
        if (res) {
            setFriendshipStatus(res.data.status);
        }
    };

    // Handle chat click
    const handleChatClick = async () => {
        if (!userId) return;
        const conversation = await getOrCreateConversation(userId);
        setConversationId(conversation._id);
        setIsOpenChatWidget(true);
        if (setShowUserProfile) {
            setShowUserProfile(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <FloatingLayer onClose={onClose}>
                <div className={cx('profile-box')}>
                    <div className={cx('container', 'd-flex', 'flex-column')}>
                        {/* Header */}
                        <UserProfileHeader
                            onClose={onClose}
                            showEditProfile={showEditProfile}
                            setShowEditProfile={setShowEditProfile}
                        />

                        {/* Main content */}
                        <div className={cx('d-flex', 'flex-column', 'content-wrapper')}>
                            <div className={cx('content')}>
                                {loading ? (
                                    <Loading />
                                ) : showEditProfile ? (
                                    <EditProfile onCancel={handleCloseEdit} onUpdate={handleCloseEdit} />
                                ) : (
                                    <>
                                        <UserInfoCard userDisplay={userDisplay} />
                                        <UserActionButtons
                                            friendshipStatus={friendshipStatus}
                                            followLoading={followLoading}
                                            isUserLogin={isUserLogin}
                                            handleShowEdit={handleToggleEdit}
                                            handleFollowUser={handleFollowUser}
                                            handleUnfollowUser={handleUnfollowUser}
                                            handleChatClick={handleChatClick}
                                            friendShipStatus="accepted"
                                        />
                                        <p className={cx('bio')}>{userDisplay.bio}</p>
                                    </>
                                )}
                            </div>

                            {/* Show more button */}
                            {!showEditProfile && !loading && (
                                <div className={cx('action-btn', 'd-flex', 'justify-content-center')}>
                                    <Button rounded primary>
                                        Show more
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </FloatingLayer>
        </div>
    );
}

UserProfile.propTypes = {
    onClose: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
};

export default UserProfile;
