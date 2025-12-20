import classNames from 'classnames/bind';
import styles from './ConversationsSidebar.module.scss';
import { SearchBar, ConversationItem } from './components';
import { Loading } from '~/components';
import { useState } from 'react';
import { useConversationContext } from '~/contexts';
const cx = classNames.bind(styles);

function ConversationsSidebar({ setConversationsSelected }) {
    const { loading, conversations } = useConversationContext();
    const [conversationActive, setConversationActive] = useState('');

    return (
        <div className={cx('wrapper')}>
            <SearchBar />
            <div className={cx('conversation-list', 'scrollbar')}>
                {loading ? (
                    <Loading />
                ) : conversations.length === 0 ? (
                    <div className={cx('no-conversations')}>
                        <p>No conversations yet. Start by finding a friend!</p>
                    </div>
                ) : (
                    conversations.map((item, index) => (
                        <ConversationItem
                            key={index}
                            data={item}
                            active={item._id === conversationActive}
                            setConversationsSelected={setConversationsSelected}
                            setConversationActive={setConversationActive}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default ConversationsSidebar;
