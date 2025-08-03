import classNames from 'classnames/bind';
import styles from './Notification.module.scss';

const cx = classNames.bind(styles);

function NotificationHeader() {
    return (
        <div className={cx('notification-header')}>
            <h3 className={cx('title')}>Thông báo</h3>
            <p>Đánh dấu đã đọc</p>
        </div>
    );
}

export default NotificationHeader;
