import classNames from 'classnames/bind';
import styles from './ChatWidget.module.scss';
import { ChatMessages, ChatHeader, FriendsListWindow } from './components';
import ChatInput from './components/ChatInput';
import { useEffect, useState } from 'react';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useGetConversation from '~/hooks/chat/useGetConversation';
const cx = classNames.bind(styles);

function ChatWidget({ setIsOpenChatWidget, userId }) {
    const [isShowFriendsList, setIsShowFriendsList] = useState(true);
    const [conversationData, setConversationData] = useState(null);
    const { fetchConversation, loading } = useGetConversation();

    useEffect(() => {
        if (!userId) return;
        const loadConversation = async () => {
            try {
                const data = await fetchConversation(userId);
                setConversationData(data);
            } catch (err) {
                console.error(err);
            }
        };

        if (userId) loadConversation();
    }, [userId]);

    return (
        <div className={cx('chat-widget')}>
            {isShowFriendsList && <FriendsListWindow setIsShowFriendsList={setIsShowFriendsList} />}

            <div className={cx('chat-window')}>
                {loading && userId ? (
                    <div className={cx('loading')}>
                        <div className={cx('spinner')} />
                        <span>Đang tải cuộc trò chuyện...</span>
                    </div>
                ) : userId ? (
                    // 💬 Có userId và đã load xong
                    <div className={cx('chat-window-inner')}>
                        <ChatHeader
                            conversationData={conversationData?.conversation}
                            setIsOpenChatWidget={setIsOpenChatWidget}
                        />
                        <ChatMessages conversationData={conversationData} setIsShowFriendsList={setIsShowFriendsList} />
                        <ChatInput />
                    </div>
                ) : (
                    // ❌ Chưa chọn đoạn chat nào
                    <div className={cx('no-chat-selected')}>
                        <div className={cx('message-icon')}>💬</div>
                        <h3>No Chat Selected</h3>
                        <span>Please select a chat to start messaging.</span>
                    </div>
                )}
            </div>

            {!isShowFriendsList && (
                <div className={cx('on-off-friends-list')} onClick={() => setIsShowFriendsList(true)}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </div>
            )}
        </div>
    );
}

export default ChatWidget;
