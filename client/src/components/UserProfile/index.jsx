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

const cx = classNames.bind(styles);

function UserProfile({ onClose, userId }) {
    const { loading, userDisplay, isUserLogin, showEditProfile, setShowEditProfile } = useUserProfile(userId);
    const { friendshipStatus, setFriendshipStatus, error } = useGetFriendshipStatus(userId);

    const { sendFriendRequest, loading: followLoading } = useSendFriendRequest();
    const { unfollowUser } = useUnfollowUser();

    const handleToggleEdit = () => setShowEditProfile((prev) => !prev);
    const handleCloseEdit = () => setShowEditProfile(false);
    const handleFollowUser = async () => {
        const res = await sendFriendRequest(userId);
        if (res) {
            setFriendshipStatus(res.data.status);
        }
    };

    const handleUnfollowUser = async () => {
        const res = await unfollowUser(userId);
        if (res) {
            setFriendshipStatus(res.data.status);
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

export default UserProfile;
