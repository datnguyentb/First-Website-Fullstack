import classNames from 'classnames/bind';
import styles from './Notification.module.scss';
import { useNotificationsContext } from '~/contexts';

const cx = classNames.bind(styles);

function NotificationHeader({ handleMarkAllAsRead }) {
    const { markAllNotificationsAsRead } = useNotificationsContext();

    const handleMarkAllAsReadClick = async () => {
        const res = await handleMarkAllAsRead();
        if (res.success) {
            markAllNotificationsAsRead();
        } else {
            console.error('Failed to mark all notifications as read');
        }
    };

    return (
        <div className={cx('notification-header')}>
            <h3 className={cx('title')}>Notifications</h3>
            <p className={cx('mark-as-read')} onClick={handleMarkAllAsReadClick}>
                Mark all as read
            </p>
        </div>
    );
}

export default NotificationHeader;
