import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';

import EditProfile from './subcomponents/EditProfile';
import UserProfileHeader from './UserProfileHeader.jsx';
import UserInfoCard from './UserInfoCard.jsx';
import UserActionButtons from './UserActionButtons.jsx';
import { Button, Loading } from '~/components';
import { useUserProfile } from './useUserProfile.js';

const cx = classNames.bind(styles);

function UserProfile({ onClose, userId }) {
    const { loading, userDisplay, isUserLogin, showEditProfile, setShowEditProfile } = useUserProfile(userId);

    const handleToggleEdit = () => setShowEditProfile((prev) => !prev);
    const handleCloseEdit = () => setShowEditProfile(false);

    if (loading) {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('cover-page')}>
                    <Loading
                        showEditProfile={showEditProfile}
                        setShowEditProfile={setShowEditProfile}
                        onClose={onClose}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('cover-page')}>
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
                                {showEditProfile ? (
                                    <EditProfile onCancel={handleCloseEdit} onUpdate={handleCloseEdit} />
                                ) : (
                                    <>
                                        <UserInfoCard userDisplay={userDisplay} />
                                        <UserActionButtons
                                            isUserLogin={isUserLogin}
                                            handleShowEdit={handleToggleEdit}
                                        />
                                        <p className={cx('bio')}>{userDisplay.bio}</p>
                                    </>
                                )}
                            </div>

                            {/* Show more button */}
                            {!showEditProfile && (
                                <div className={cx('action-btn', 'd-flex', 'justify-content-center')}>
                                    <Button rounded primary>
                                        Show more
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
