import classNames from 'classnames/bind';
import styles from '../ChatWidget.module.scss';
import Img from '~/components/Img';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';
import { useUserContext } from '~/contexts';
import baseUrl from '~/helper/baseUrl';

const cx = classNames.bind(styles);

const fakeUsers = {
    _id: 'u1',
    fullName: 'Minh Nguyễn',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400',
    status: 'online',
    lastMessage: 'Đi cà phê không bro?',
    lastOnline: '2025-10-26T11:00:00Z',
};

function ChatHeader({ setIsOpenChatWidget, conversationInfo }) {
    const { user } = useUserContext();
    let userInfo = null;
    if (conversationInfo && conversationInfo.participants) {
        for (const participant of conversationInfo.participants) {
            if (participant._id !== user._id) {
                userInfo = participant;
                break;
            }
        }
    }

    return (
        <div className={cx('chat-header')}>
            {userInfo && (
                <div className={cx('chat-user-info')}>
                    <div className={cx('user-avatar')}>
                        <Img circle src={baseUrl(userInfo.avatarUrl)} />
                        {fakeUsers.status === 'online' && <div className={cx('online-indicator')}></div>}
                    </div>
                    <div
                        className={cx('chat-username')}
                        title={`${userInfo.firstName} ${userInfo.lastName}`}
                    >{`${userInfo.firstName} ${userInfo.lastName}`}</div>
                </div>
            )}
            <div className={cx('chat-actions')}>
                <button className={cx('chat-action-btn', 'call-audio')}>
                    <FontAwesomeIcon icon={faPhone} />
                </button>
                <button className={cx('chat-action-btn', 'call-video')}>
                    <FontAwesomeIcon icon={faVideo} />
                </button>
                <button className={cx('chat-action-btn', 'close')} onClick={() => setIsOpenChatWidget(false)}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
            </div>
        </div>
    );
}

export default ChatHeader;
