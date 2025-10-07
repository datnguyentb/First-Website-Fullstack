import classNames from 'classnames/bind';
import styles from './ChatWindown.module.scss';
import { ChatInput, ChatWindownHeader, MessagesArea } from './components';
const cx = classNames.bind(styles);

function ChatWindown() {
    return (
        <div className={cx('wrapper')}>
            <ChatWindownHeader />
            <MessagesArea />
            <ChatInput />
        </div>
    );
}

export default ChatWindown;
