import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
import { faCommentDots, faEllipsis, faSortDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Loading } from '~/components';

const cx = classNames.bind(styles);

function UserActionButtons({
    friendshipStatus,
    followLoading,
    isUserLogin,
    handleShowEdit,
    handleFollowUser,
    handleUnfollowUser,
    handleChatClick,
}) {
    let label;
    let alt;
    let handleClick;
    let downIcon;

    switch (friendshipStatus) {
        case 'accepted':
            label = 'friend';
            alt = 'You are friends with this user';
            handleClick = handleUnfollowUser;
            downIcon = true;
            break;
        case 'pending':
            label = 'following';
            alt = 'Unfollow this user';
            handleClick = handleUnfollowUser;
            downIcon = false;

            break;
        default:
            label = 'follow';
            alt = 'Follow this user';
            handleClick = handleFollowUser;
            downIcon = false;
    }

    const guestActions = [
        {
            label,
            icon: faUser,
            onClick: handleClick,
            alt,
            loading: followLoading,
            downIcon,
        },
        {
            label: 'message',
            icon: faCommentDots,
            onClick: handleChatClick,
        },
        {
            label: 'more',
            icon: faEllipsis,
            onClick: () => {
                alert('more click');
            },
        },
    ];

    const userActions = [
        { label: '✏️ Edit Profile', onClick: handleShowEdit },
        { label: '⚙️ Settings', onClick: () => {} },
    ];

    const actions = isUserLogin ? userActions : guestActions;

    let content = actions.map((action, index) => (
        <Button
            key={index}
            small
            outline
            title={action.alt}
            onClick={action.onClick}
            leftIcon={action.icon ? <FontAwesomeIcon icon={action.icon} /> : null}
            rightIcon={action.downIcon && <FontAwesomeIcon icon={faSortDown} />}
            className={cx('btn-custom', 'fw-bold', action.label)}
        >
            {action.loading ? <Loading small /> : action.label}
        </Button>
    ));

    return <div className={cx('d-flex', 'justify-content-center', 'action-btn-wrapper')}>{content}</div>;
}

UserActionButtons.propTypes = {
    friendshipStatus: PropTypes.string,
    followLoading: PropTypes.bool,
    isUserLogin: PropTypes.bool,
    // handleShowEdit: PropTypes.func.isRequired,
    // handleFollowUser: PropTypes.func.isRequired,
    // handleUnfollowUser: PropTypes.func.isRequired,
};

export default UserActionButtons;
