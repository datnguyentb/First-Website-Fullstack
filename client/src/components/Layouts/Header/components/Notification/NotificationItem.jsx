import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Notification.module.scss';
import Img from '~/components/Img';
import { timeAgo } from '../../../../../utils/dateUtils';
import baseUrl from '~/helper/baseUrl';

const cx = classNames.bind(styles);

function NotificationItem({ item }) {
    return (
        <div className={cx('notification-item', item.isRead && 'readed')}>
            <div className={cx('avatar')} style={{ backgroundColor: item.avatarColor }}>
                {item.actors[0].avatar ? <Img src={baseUrl(item.actors[0].avatar)} /> : <span>td</span>}
            </div>
            <div className={cx('notification-content')}>
                <p>
                    <strong>
                        {item.actors[0].firstName} {item.actors[0].lastName}{' '}
                    </strong>{' '}
                    {item.content} {' của bạn'}
                </p>
                <span className={cx('time')}>{timeAgo(item.createdAt)}</span>
            </div>
            <div className={cx(!item.isRead ? 'unread-dot' : 'readed')}></div>
        </div>
    );
}

NotificationItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default NotificationItem;
