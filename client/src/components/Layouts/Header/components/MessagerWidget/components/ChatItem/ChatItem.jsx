import classNames from 'classnames/bind';
import styles from './ChatItem.module.scss';
import { useChatWidgetContext } from '~/contexts';
import { Img } from '~/components';
import useIsMe from '~/helper/useIsMe';
import baseUrl from '~/helper/baseUrl';

const cx = classNames.bind(styles);

function ChatItem({ data, handleHideMessagerWidget }) {
    const { setIsOpenChatWidget, setUserId } = useChatWidgetContext();

    const isMe = useIsMe();

    const otherUser = data.participants.find((user) => !isMe(user._id));

    const handleClick = () => {
        setUserId(otherUser?._id || '');
        setIsOpenChatWidget(true);
        handleHideMessagerWidget();
    };

    return (
        <li className={cx('chat-item', 'unread')} onClick={handleClick}>
            {/* Placeholder avatar image */}
            <div className={cx('chat-avatar-wrapper')}>
                <Img src={baseUrl(otherUser?.avatarUrl)} alt="Avatar" className={cx('chat-avatar')} />
            </div>

            <div className={cx('chat-content')}>
                <div className={cx('line-top')}>
                    <span className={cx('chat-name')}>
                        {otherUser ? `${otherUser.firstName} ${otherUser.lastName}` : 'Unknown'}
                    </span>
                    <span className={cx('chat-time')}>
                        {data.lastMessage?.createdAt ? new Date(data.lastMessage.createdAt).toLocaleTimeString() : ''}
                    </span>
                </div>

                <div className={cx('chat-message')}>
                    {`${isMe(data.lastMessage?.sender) ? 'You: ' : ''}${data.lastMessage?.content || 'No messages yet'}`}
                </div>
            </div>

            {data.isUnread && <div className={cx('unread-indicator')}></div>}
        </li>
    );
}

export default ChatItem;
