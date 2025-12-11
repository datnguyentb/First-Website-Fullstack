import classNames from 'classnames/bind';
import styles from './ChatTabs.module.scss';

const cx = classNames.bind(styles);

function ChatTabs() {
    return (
        <div className={cx('chat-tabs')}>
            {/* Combine cx with className='active' for active state */}
            <button className={cx('active')}>All</button>
            <button>Unread</button>
            <button>Groups</button>
        </div>
    );
}

export default ChatTabs;
