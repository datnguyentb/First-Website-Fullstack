import classNames from 'classnames/bind';
import userApi from '~/api/userApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditProfile from './components/EditProfile.jsx';
import styles from './UserProfile.module.scss';
import { faChevronLeft, faCommentDots, faEllipsis, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button, Img, Loading } from '~/components';
import { useEffect, useState } from 'react';
import baseUrl from '~/helper/baseUrl.js';
import { useUser } from '~/contexts/useUser';

const cx = classNames.bind(styles);

function UserProfile({ onClose, userId }) {
    const { user } = useUser();
    const [userDisplay, setUserDisplay] = useState();
    const [isUserLogin, setIsUserLogin] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            if (user._id === userId) {
                setUserDisplay(user);
                setIsUserLogin(true);
            } else {
                try {
                    const res = await userApi.getUserById(userId);
                    setUserDisplay(res.data.data);
                } catch (error) {
                    console.error('Error fetching user login:', error);
                } finally {
                    //
                }
            }
        };
        fetchUser();
    }, [user, userId]);

    const handleShowEdit = () => {
        setShowEditProfile(!showEditProfile);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('cover-page')}>
                <div className={cx('profile-box')}>
                    {!userDisplay ? (
                        <Loading />
                    ) : (
                        <div className={cx('container', 'd-flex', 'flex-column')}>
                            <div className={cx('header', 'd-flex', 'justify-content-between', 'align-items-center')}>
                                {showEditProfile ? (
                                    <div className={cx('d-flex', 'align-items-center')}>
                                        <div className={cx('dir-icon', 'me-5')} onClick={() => setShowEditProfile()}>
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                        </div>
                                        <h2 className={cx('header-title')}>Edit Profile</h2>
                                    </div>
                                ) : (
                                    <div>
                                        <h2 className={cx('header-title')}>Profile</h2>
                                    </div>
                                )}

                                <div className={cx('close_icon')} title="Close" onClick={() => onClose()}>
                                    <FontAwesomeIcon icon={faXmark} />
                                </div>
                            </div>
                            <div className={cx('d-flex', 'flex-column', 'content-wrapper')}>
                                <div className={cx('content')}>
                                    {showEditProfile ? (
                                        <EditProfile
                                            onCancel={() => setShowEditProfile(false)}
                                            onUpdate={() => {
                                                setShowEditProfile(false);
                                            }}
                                        />
                                    ) : (
                                        <div>
                                            <div className={cx('avatar')}>
                                                <Img src={baseUrl(userDisplay.avatarUrl)} alt="avatar" />
                                            </div>
                                            <h2
                                                className={cx('name')}
                                            >{`${userDisplay.firstName} ${userDisplay.lastName}`}</h2>
                                            <div
                                                className={cx(
                                                    'joined',
                                                    'd-flex',
                                                    'justify-content-center',
                                                    'align-items-center',
                                                )}
                                            >
                                                <span className={cx('member')}>Member</span>
                                                <div className={cx('line')}></div>
                                                <span className={cx('date')}>
                                                    Joined {new Date(userDisplay.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            {!isUserLogin ? (
                                                <div>
                                                    <Button
                                                        small
                                                        outline
                                                        leftIcon={<FontAwesomeIcon icon={faUser} />}
                                                        className={cx('btn-custom', 'fw-bold')}
                                                    >
                                                        Follow
                                                    </Button>
                                                    <Button
                                                        small
                                                        outline
                                                        leftIcon={<FontAwesomeIcon icon={faCommentDots} />}
                                                        className={cx('btn-custom', 'fw-bold')}
                                                    >
                                                        Message
                                                    </Button>
                                                    <Button
                                                        small
                                                        outline
                                                        leftIcon={<FontAwesomeIcon icon={faEllipsis} />}
                                                        className={cx('btn-custom', 'fw-bold')}
                                                    >
                                                        More
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <Button
                                                        small
                                                        outline
                                                        onClick={handleShowEdit}
                                                        className={cx('btn-custom', 'fw-bold')}
                                                    >
                                                        ✏️ Edit Profile
                                                    </Button>
                                                    <Button small outline className={cx('btn-custom', 'fw-bold')}>
                                                        ⚙️ Settings
                                                    </Button>
                                                </div>
                                            )}

                                            <p className={cx('bio')}>{userDisplay.bio}</p>
                                        </div>
                                    )}
                                </div>

                                {!showEditProfile && (
                                    <div className={cx('action-btn', 'd-flex', 'justify-content-center')}>
                                        <Button rounded primary>
                                            Show more
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
