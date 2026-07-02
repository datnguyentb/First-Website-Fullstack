import classNames from 'classnames/bind';
import styles from './MessagerWidget.module.scss';
import { ChatItem, ChatTabs, Header } from './components';
import { Link } from 'react-router-dom';
import { useConversationContext, useChatWidgetContext } from '~/contexts';

// Gán biến cx để sử dụng CSS Module
const cx = classNames.bind(styles);

function MessagerWidget({ handleHideMessagerWidget }) {
    const { loading, conversations } = useConversationContext();
    const { setIsOpenChatWidget, setConversationId, isShowFriendsList, setIsShowFriendsList } = useChatWidgetContext();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('messenger-widget')}>
                <Header />

                <ChatTabs />
                <>
                    {loading && <div className={cx('loading')}>Loading...</div>}

                    {!loading && conversations.length === 0 && (
                        <div className={cx('no-conversations')}>
                            <div className={cx('no-conversations-icon')}>
                                <i className="fa-regular fa-comments"></i> {/* Hoặc SVG icon */}
                            </div>
                            <h3>No chats yet</h3>
                            <p>Messages from your friends will appear here.</p>
                            <button
                                className={cx('find-friend-btn')}
                                onClick={() => {
                                    setIsOpenChatWidget(true);
                                    setConversationId('');
                                    setIsShowFriendsList(true);
                                }}
                            >
                                Find friends
                            </button>
                        </div>
                    )}

                    {!loading && conversations.length > 0 && (
                        <ul className={cx('chat-list')}>
                            {conversations.map((chat) => (
                                <ChatItem
                                    key={chat._id}
                                    data={chat}
                                    handleHideMessagerWidget={handleHideMessagerWidget}
                                />
                            ))}
                        </ul>
                    )}
                </>

                {/* Footer */}
                <div className={cx('chat-footer')}>
                    <Link to={'/messenger'}>
                        <button>See all in Messenger</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MessagerWidget;
