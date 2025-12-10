import classNames from 'classnames/bind';
import styles from './ChatItem.module.scss';
import { useChatWidgetContext } from '~/contexts';
const cx = classNames.bind(styles);

function ChatItem({ data, handleHideMessagerWidget }) {
    const { setIsOpenChatWidget } = useChatWidgetContext();

    const handleClick = () => {
        setIsOpenChatWidget(true);
        handleHideMessagerWidget();
    };

    return (
        <li className={cx('chat-item', 'unread')} onClick={handleClick}>
            {/* Placeholder image (chú ý: dùng className) */}
            <img
                src="https://via.placeholder.com/50/F5A727/FFFFFF?text=L.T"
                alt="Avatar"
                className={cx('chat-avatar')}
            />
            <div className={cx('chat-content')}>
                <div className={cx('line-top')}>
                    <span className={cx('chat-name')}>{data.name}</span>
                    <span className={cx('chat-time')}>{data.time}</span>
                </div>
                <div className={cx('chat-message')}>Bạn: {data.lastMessage}</div>
            </div>
            {data.isUnread && <div className={cx('unread-indicator')}></div>}
        </li>
    );
}

export default ChatItem;
