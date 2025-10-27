import classNames from 'classnames/bind';
import styles from './ConversationsSidebar.module.scss';
import { SearchBar, ConversationItem } from './components';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

function ConversationsSidebar() {
    const [conversations, setConversations] = useState([]);
    useEffect(() => {
        // Mock fetching conversations
        // const fetchConversations = async () => {};
    });
    return (
        <div className={cx('wrapper')}>
            <SearchBar />
            <div className={cx('conversation-list', 'scrollbar')}>
                {conversations.map((item, index) => (
                    <ConversationItem key={index} data={item} active={item.active} />
                ))}
            </div>
        </div>
    );
}

export default ConversationsSidebar;
