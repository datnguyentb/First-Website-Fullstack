import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
import { faCommentDots, faEllipsis, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '~/components';

const cx = classNames.bind(styles);

function UserActionButtons({ friendshipStatus, isUserLogin, handleShowEdit, handleFollowUser, handleUnfollowUser }) {
    let label;
    let alt;
    let handleClick;

    switch (friendshipStatus) {
        case 'accepted':
            label = 'Friend';
            alt = 'You are friends with this user';
            handleClick = handleUnfollowUser;
            break;
        case 'pending':
            label = 'Following';
            alt = 'Unfollow this user';
            handleClick = handleUnfollowUser;
            break;
        default:
            label = 'Follow';
            alt = 'Follow this user';
            handleClick = handleFollowUser;
    }

    const guestActions = [
        {
            label,
            icon: faUser,
            onClick: handleClick,
            alt,
        },
        { label: 'Message', icon: faCommentDots, onClick: () => {} },
        { label: 'More', icon: faEllipsis, onClick: () => {} },
    ];

    const userActions = [
        { label: '✏️ Edit Profile', onClick: handleShowEdit },
        { label: '⚙️ Settings', onClick: () => {} },
    ];

    const actions = isUserLogin ? userActions : guestActions;

    return (
        <div className={cx('d-flex', 'justify-content-center')}>
            {actions.map((action, index) => (
                <Button
                    key={index}
                    small
                    outline
                    title={action.alt}
                    onClick={action.onClick}
                    leftIcon={action.icon ? <FontAwesomeIcon icon={action.icon} /> : null}
                    className={cx('btn-custom', 'fw-bold')}
                >
                    {action.label}
                </Button>
            ))}
        </div>
    );
}

export default UserActionButtons;
