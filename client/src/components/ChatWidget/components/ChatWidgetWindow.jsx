import classNames from 'classnames/bind';
import styles from '../ChatWidget.module.scss';
import { ChatHeader, ChatMessages, ChatInput } from '.';
import useGetConversation from '~/hooks/conversation/useGetConversation';
import useJoinConversation from '~/socket/hook/conversation/useJoinConversation';
import useGetMessages from '~/hooks/chat/useGetMessages';

const cx = classNames.bind(styles);

function ChatWidgetWindow({ userId, setIsOpenChatWidget, setIsShowFriendsList }) {
    const { conversationInfo, loading } = useGetConversation(userId);
    const { messages, loading: loadingMessages } = useGetMessages(conversationInfo?._id);

    useJoinConversation(conversationInfo?._id);

    const handleSendMessage = (message) => {
        console.log('📨 Sending:', message);
    };

    console.log('messages: ', messages);

    // Không có userId
    if (!userId)
        return (
            <div className={cx('no-chat-selected')}>
                <div className={cx('message-icon')}>💬</div>
                <h3>No Chat Selected</h3>
                <span>Please select a chat to start messaging.</span>
            </div>
        );

    // Đang tải
    if (loading || loadingMessages)
        return (
            <div className={cx('loading')}>
                <div className={cx('spinner')} />
                <span>Đang tải cuộc trò chuyện...</span>
            </div>
        );

    // Hiển thị UI chat
    return (
        <div className={cx('chat-window-inner')}>
            <ChatHeader conversationInfo={conversationInfo} setIsOpenChatWidget={setIsOpenChatWidget} />

            <ChatMessages conversationInfo={conversationInfo} setIsShowFriendsList={setIsShowFriendsList} />

            <ChatInput handleSendMessage={handleSendMessage} />
        </div>
    );
}

export default ChatWidgetWindow;
