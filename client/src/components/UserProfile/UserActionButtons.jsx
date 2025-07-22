import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
import { faCommentDots, faEllipsis, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '~/components';

const cx = classNames.bind(styles);

function UserActionButtons({ isUserLogin, handleShowEdit }) {
    return (
        <div>
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
                    <Button small outline onClick={handleShowEdit} className={cx('btn-custom', 'fw-bold')}>
                        ✏️ Edit Profile
                    </Button>
                    <Button small outline className={cx('btn-custom', 'fw-bold')}>
                        ⚙️ Settings
                    </Button>
                </div>
            )}
        </div>
    );
}

export default UserActionButtons;
