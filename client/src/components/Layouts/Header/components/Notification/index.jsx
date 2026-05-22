import classNames from 'classnames/bind';
import styles from './Notification.module.scss';
import NotificationItem from './NotificationItem';
import NotificationHeader from './NotificationHeader';
import NotificationFooter from './NotificationFooter';
import { useNotification } from './useNotification';
import { getArrayItems } from '~/utils/getArrayItems';
import { useNotificationsContext } from '~/contexts';

const cx = classNames.bind(styles);

function Notification() {
    const { isLess, setIsLess, notifications, setNotifications, NOTI } = useNotification();

    const handleShow = () => {
        setIsLess(!isLess);

        if (!isLess) {
            setNotifications(getArrayItems(NOTI, 4));
        } else {
            setNotifications(NOTI);
        }
    };

    const { notifications: contextNotifications } = useNotificationsContext();

    return (
        <div className={cx('wrapper')}>
            <NotificationHeader />

            <div className={cx('notification-content')}>
                {contextNotifications.length > 0 ? (
                    contextNotifications.map((item, index) => (
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
