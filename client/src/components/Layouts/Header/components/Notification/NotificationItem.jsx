import classNames from 'classnames/bind';
import styles from './Notification.module.scss';
import Img from '~/components/Img';

const cx = classNames.bind(styles);

function NotificationItem({ item }) {
    return (
        <div className={cx('notification-item', item.isRead && 'readed')}>
            <div className={cx('avatar')} style={{ backgroundColor: item.avatarColor }}>
                {item.user_avatar ? (
                    <Img src="https://cdn.pixabay.com/photo/2016/09/02/18/40/sandburg-1639999_640.jpg" />
                ) : (
                    <span>{item.avatarText}</span>
                )}
            </div>
            <div className={cx('notification-content')}>
                <p>
                    <strong>{item.user}</strong> {item.message}
                </p>
                <span className={cx('time')}>{item.timeAgo}</span>
            </div>
            <div className={cx(!item.isRead ? 'unread-dot' : 'readed')}></div>
        </div>
    );
}

export default NotificationItem;
