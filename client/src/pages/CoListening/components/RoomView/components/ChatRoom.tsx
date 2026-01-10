import classNames from 'classnames/bind';
import styles from '../RoomView.module.scss';

const cx = classNames.bind(styles);

const CHAT_MESSAGES_TEST = [
    // Sample chat messages
    { id: 1, user: 'Nguyễn Văn A', message: 'Chào mọi người!' },
    { id: 2, user: 'Trần Thị B', message: 'Chào bạn!' },
    { id: 3, user: 'Lê Văn C', message: 'Mình rất thích bài hát này.' },
];

function ChatRoom() {
    return (
        <div className={cx('chat-room')}>
            <h2 className={cx('chat-room-title')}>Chat Room</h2>
            <div className={cx('chat-room-messages')}>
                <span className={cx('welcome')}>Chào mừng bạn đến với phòng nghe nhạc chung</span>
                {CHAT_MESSAGES_TEST.map((msg) => (
                    <div key={msg.id} className={cx('chat-message', msg.id === 1 && 'your-mes')}>
                        {msg.id !== 1 && <span className={cx('chat-message-user')}>{msg.user}</span>}
                        <span className={cx('chat-message-text')}>{msg.message}</span>
                    </div>
                ))}
            </div>
            <div className={cx('chat-room-input')}>
                <input type="text" placeholder="Gõ tin nhắn..." />
                <button>Gửi</button>
            </div>
        </div>
    );
}

export default ChatRoom;
