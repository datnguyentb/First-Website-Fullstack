import classNames from 'classnames/bind';
import styles from './ChatWindownHeader.module.scss';
import { Img } from '~/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';
import useIsMe from '~/helper/useIsMe';
import baseUrl from '~/helper/baseUrl';
const cx = classNames.bind(styles);

function ChatWindownHeader({ conversationsSelected }) {
    const isMe = useIsMe();

    const otherUser = conversationsSelected.participants.find((user) => !isMe(user._id));
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <div className={cx('avatar')}>
                    <Img src={baseUrl(otherUser?.avatarUrl)} />
                </div>
                <div className={cx('user-status')}>
                    <div className={cx('name')}>
                        {otherUser ? `${otherUser.firstName} ${otherUser.lastName}` : 'Unknown'}
                    </div>
                    <div className={cx('status')}>Online</div>
                </div>
            </div>
            <div className={cx('actions')}>
                <button className={cx('action-btn')} title="call">
                    <FontAwesomeIcon icon={faPhone} />
                </button>
                <button className={cx('action-btn')} title="video call">
                    <FontAwesomeIcon icon={faVideo} />
                </button>
                <button className={cx('action-btn')} title="info">
                    <FontAwesomeIcon icon={faInfo} />
                </button>
            </div>
        </div>
    );
}

export default ChatWindownHeader;
