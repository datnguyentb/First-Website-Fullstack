import classNames from 'classnames/bind';
import styles from './Messenger.module.scss';
import { ChatWindown, ConversationsSidebar } from './components';
import { useState } from 'react';

const cx = classNames.bind(styles);
function Messenger() {
    const [conversationsSelected, setConversationsSelected] = useState(null);

    return (
        <div className={cx('wrapper')}>
            <ConversationsSidebar setConversationsSelected={setConversationsSelected} />
            <ChatWindown conversationId={conversationsSelected?._id} />
            {/* <SocketTest /> */}
        </div>
    );
}

export default Messenger;
