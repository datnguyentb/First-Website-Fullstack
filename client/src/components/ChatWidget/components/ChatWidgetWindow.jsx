import classNames from 'classnames/bind';
import styles from '../ChatWidget.module.scss';
import { ChatHeader, ChatMessages, ChatInput } from '.';
import useJoinConversation from '~/socket/hook/conversation/useJoinConversation';
import useGetMessages from '~/hooks/chat/useGetMessages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import useSendMessage from '~/socket/hook/messages/useSendMessange';
import useReceiveMessage from '~/hooks/chat/useReceiveMessage';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function ChatWidgetWindow({ userId, setIsOpenChatWidget, conversationInfo }) {
    const { messages, setMessages, loading: loadingMessages } = useGetMessages(conversationInfo?._id);
    const { sendMessage } = useSendMessage();
    const lastMessage = useReceiveMessage();

    useJoinConversation(conversationInfo?._id);

    const handleSendMessage = async (messageInput) => {
        if (!messageInput?.trim()) return;

        if (!conversationInfo?._id) {
            return;
        }

        const payload = {
            content: messageInput,
            attachments: [],
            replyTo: null,
        };

        sendMessage(conversationInfo._id, payload);
    };

    useEffect(() => {
        if (lastMessage && lastMessage.conversation === conversationInfo?._id) {
            setMessages((prevMessages) => [lastMessage, ...prevMessages]);
        }
    }, [lastMessage, conversationInfo?._id, setMessages]);

    // Không có userId
    if (!userId)
        return (
            <div className={cx('no-chat-selected')}>
                <div className={cx('message-icon')}>💬</div>
                <h3>No Chat Selected</h3>
                <span>Please select a chat to start messaging.</span>
                <div
                    className={cx('close-chatwidget-no-chat', 'chat-action-btn')}
                    onClick={() => setIsOpenChatWidget(false)}
                >
                    <FontAwesomeIcon icon={faClose} />
                </div>
            </div>
        );

    // Đang tải
    if (loadingMessages)
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

            <ChatMessages messages={messages} />

            <ChatInput handleSendMessage={handleSendMessage} />
        </div>
    );
}

export default ChatWidgetWindow;
