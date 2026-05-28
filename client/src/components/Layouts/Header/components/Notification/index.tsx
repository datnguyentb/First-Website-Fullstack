import classNames from 'classnames/bind';
import styles from './Notification.module.scss';
import NotificationItem from './NotificationItem';
import NotificationHeader from './NotificationHeader';
import NotificationFooter from './NotificationFooter';
import { getArrayItems } from '~/utils/getArrayItems';
import { useNotificationsContext } from '~/contexts';
import { useState } from 'react';
import useMarkAllRead from '~/hooks/notifications/useMarkAllRead';

const cx = classNames.bind(styles);

function Notification() {
    const { notifications: contextNotifications } = useNotificationsContext();
    const [isLess, setIsLess] = useState(true);
    const { handleMarkAllAsRead } = useMarkAllRead();

    const displayedNotifications = isLess ? getArrayItems(contextNotifications, 5) : contextNotifications;

    const handleShow = () => {
        setIsLess((prev) => !prev);
    };

    return (
        <div className={cx('wrapper')}>
            <NotificationHeader handleMarkAllAsRead={handleMarkAllAsRead} />

            <div className={cx('notification-content')}>
                {displayedNotifications.length > 0 ? (
                    displayedNotifications.map((item, index) => (
                        <li key={index}>
                            <NotificationItem item={item} />
                        </li>
                    ))
                ) : (
                    <div className={cx('empty')}>
                        <span className={cx('empty-icon')}>🔔</span>
                        <p className={cx('empty-title')}>Chưa có thông báo nào</p>
                        <span className={cx('empty-desc')}>Khi có hoạt động mới bạn sẽ thấy ở đây</span>
                    </div>
                )}
            </div>

            {contextNotifications.length > 0 && (
                <NotificationFooter handleShow={handleShow} isLess={isLess} setIsLess={setIsLess} />
            )}
        </div>
    );
}

export default Notification;
