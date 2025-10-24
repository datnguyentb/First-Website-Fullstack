import classNames from 'classnames/bind';
import styles from './Messages.module.scss';
import { ChatWindown, ConversationsSidebar } from './components';
import SocketTest from './components/SocketTest';

const cx = classNames.bind(styles);
function Messages() {
    return (
        <div className={cx('wrapper')}>
            <ConversationsSidebar />
            <ChatWindown />
            {/* <SocketTest /> */}
        </div>
    );
}

export default Messages;
