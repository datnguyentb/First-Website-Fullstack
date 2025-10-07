import classNames from 'classnames/bind';
import styles from './Messages.module.scss';
import { ChatWindown, ConversationsSidebar } from './components';

const cx = classNames.bind(styles);
function Messages() {
    return (
        <div className={cx('wrapper')}>
            <ConversationsSidebar />
            <ChatWindown />
        </div>
    );
}

export default Messages;
