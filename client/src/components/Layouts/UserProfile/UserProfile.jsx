import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './UserProfile.module.scss';
import { faCircleXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { authBackground } from '../../../assets/imgs/background';
import Img from '../../Img';
import Button from '../../Button';

const cx = classNames.bind(styles);

const userInformation = {
    name: 'John Doe',
    username: 'johndoe',
    location: 'New York, United States',
    bio: 'I’m a passionate web developer and digital specialist with a strong interest in creating user-centered designs and building responsive.',
    avatar_href: 'https://example.com/avatar.jpg',
    followers: 120,
    following: 150,
    posts: 30,
};

function UserProfile(onClose) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('cover-page')}>
                <div className={cx('profile-box')}>
                    <div className={cx('container')}>
                        <div className={cx('close_icon')} onClick={() => onClose.onClose()}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </div>

                        <div className={cx('avatar')}>
                            <Img src={authBackground.mobile_login_2} alt="avatar" />
                        </div>

                        <h2 className={cx('name')}>{userInformation.name}</h2>
                        <p className={cx('location')}>{userInformation.location}</p>
                        <Button
                            small
                            leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                            className={cx('edit-btn', 'fw-bold')}
                        >
                            Edit
                        </Button>

                        <p className={cx('position')}>{userInformation.bio}</p>

                        <div className={cx('stats', 'd-flex', 'justify-content-space-between')}>
                            <div>
                                <strong>{userInformation.followers}</strong>
                                <div className="small">Followers</div>
                            </div>
                            <div>
                                <strong>{userInformation.following}</strong>
                                <div className="small">Following</div>
                            </div>
                            <div>
                                <strong>{userInformation.posts}</strong>
                                <div className="small">Posts</div>
                            </div>
                        </div>

                        <Button rounded primary>
                            Show more
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
