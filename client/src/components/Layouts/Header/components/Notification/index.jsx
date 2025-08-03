import classNames from 'classnames/bind';
import styles from './Notification.module.scss';
import NotificationItem from './NotificationItem';
import NotificationHeader from './NotificationHeader';
import NotificationFooter from './NotificationFooter';
import { useNotification } from './useNotification';
import { getArrayItems } from '~/utils/getArrayItems';

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

    return (
        <div className={cx('wrapper')}>
            <NotificationHeader />
            <div className={cx('notification-content')}>
                {notifications.map((item, index) => {
                    return (
                        <li key={index}>
                            <NotificationItem item={item} />
                        </li>
                    );
                })}
            </div>
            <NotificationFooter handleShow={handleShow} isLess={isLess} setIsLess={setIsLess} />
        </div>
    );
}

export default Notification;
