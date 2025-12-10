import classNames from 'classnames/bind';
import styles from './ChatTabs.module.scss';
const cx = classNames.bind(styles);

function ChatTabs() {
    return (
        <div className={cx('chat-tabs')}>
            {/* Kết hợp cx với className='active' cho trạng thái */}
            <button className={cx('active')}>Tất cả</button>
            <button>Chưa đọc</button>
            <button>Nhóm</button>
        </div>
    );
}

export default ChatTabs;
