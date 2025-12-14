import classNames from 'classnames/bind';
import styles from './MessagerWidget.module.scss';
import { ChatItem, ChatTabs, Header } from './components';
import useGetAllConversations from '~/hooks/conversation/useGetAllConversations';
import { Link } from 'react-router-dom';

// Gán biến cx để sử dụng CSS Module
const cx = classNames.bind(styles);

function MessagerWidget({ handleHideMessagerWidget }) {
    const { conversationsList, loading } = useGetAllConversations();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('messenger-widget')}>
                <Header />

                <ChatTabs />
                <>
                    {loading && <div className={cx('loading')}>Loading...</div>}

                    {!loading && conversationsList.length === 0 && (
                        <div className={cx('no-conversations')}>
                            <p>No conversations yet. Start by finding a friend!</p>
                        </div>
                    )}

                    {!loading && conversationsList.length > 0 && (
                        <ul className={cx('chat-list')}>
                            {conversationsList.map((chat) => (
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
