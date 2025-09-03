import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Notification.module.scss';

const cx = classNames.bind(styles);

function NotificationFooter({ isLess, handleShow }) {
    return (
        <div onClick={handleShow} className={cx('notification-footer')}>
            {isLess ? 'View more notifications' : 'Show less'}
        </div>
    );
}

NotificationFooter.propTypes = {
    isLess: PropTypes.bool.isRequired,
    handleShow: PropTypes.func.isRequired,
};

export default NotificationFooter;
