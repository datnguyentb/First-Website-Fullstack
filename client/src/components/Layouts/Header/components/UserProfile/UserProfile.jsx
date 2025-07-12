import classNames from 'classnames/bind';
import userApi from '~/api/userApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './UserProfile.module.scss';
import { faCommentDots, faEllipsis, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button, Img, Loading } from '~/components';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function UserProfile(onClose) {
    const [userLogin, setUserLogin] = useState();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user?._id;
                const res = await userApi.getUserById(userId);
                setUserLogin(res.data.data);
            } catch (error) {
                console.error('Error fetching user login:', error);
            } finally {
                //
            }
        };
        fetchUser();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('cover-page')}>
                <div className={cx('profile-box')}>
                    {!userLogin ? (
                        <Loading />
                    ) : (
                        <div className={cx('container', 'd-flex', 'flex-column', 'justify-content-between')}>
                            <div className={cx('header', 'd-flex', 'justify-content-between', 'align-items-center')}>
                                <h2 className={cx('header-title')}>Profile</h2>
                                <div className={cx('close_icon')} title="Close" onClick={() => onClose.onClose()}>
                                    <FontAwesomeIcon icon={faXmark} />
                                </div>
                            </div>
                            <div className={cx('content')}>
                                <div className={cx('avatar')}>
                                    <Img src={userLogin.avatar_url} alt="avatar" />
                                </div>
                                <h3 className={cx('username')}>{userLogin.username || '@datnguyen99'}</h3>
                                <h2 className={cx('name')}>{`${userLogin.first_name} ${userLogin.last_name}`}</h2>
                                <div className={cx('joined', 'd-flex', 'justify-content-center', 'align-items-center')}>
                                    <span className={cx('member')}>Member</span>
                                    <div className={cx('line')}></div>
                                    <span className={cx('date')}>
                                        Joined {new Date(userLogin.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
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

                                <p className={cx('bio')}>{userLogin.bio}</p>
                            </div>

                            <div className={cx('action-btn', 'd-flex', 'justify-content-center')}>
                                <Button rounded primary>
                                    Show more
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
