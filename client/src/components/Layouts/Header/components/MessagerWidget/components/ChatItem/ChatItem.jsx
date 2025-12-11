import classNames from 'classnames/bind';
import styles from './ChatItem.module.scss';
import { useChatWidgetContext } from '~/contexts';
import { Img } from '~/components';

const cx = classNames.bind(styles);

function ChatItem({ data, handleHideMessagerWidget }) {
    const { setIsOpenChatWidget } = useChatWidgetContext();

    const handleClick = () => {
        setIsOpenChatWidget(true);
        handleHideMessagerWidget();
    };

    return (
        <li className={cx('chat-item', 'unread')} onClick={handleClick}>
            {/* Placeholder avatar image */}
            <div className={cx('chat-avatar-wrapper')}>
                <Img
                    src="https://static.vecteezy.com/system/resources/previews/026/321/698/non_2x/love-theme-background-with-heart-pattern-template-for-banner-social-media-greeting-card-web-gift-wrap-invitation-free-vector.jpg"
                    alt="Avatar"
                    className={cx('chat-avatar')}
                />
            </div>

            <div className={cx('chat-content')}>
                <div className={cx('line-top')}>
                    <span className={cx('chat-name')}>{data.name}</span>
                    <span className={cx('chat-time')}>{data.time}</span>
                </div>

                <div className={cx('chat-message')}>You: {data.lastMessage}</div>
            </div>

            {data.isUnread && <div className={cx('unread-indicator')}></div>}
        </li>
    );
}

export default ChatItem;
