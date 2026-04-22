import classNames from 'classnames/bind';
import styles from '../RoomView.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const CHAT_MESSAGES_TEST = [
    // Sample chat messages
    { id: 1, user: 'Nguyễn Văn A', message: 'Chào mọi người!' },
    { id: 2, user: 'Trần Thị B', message: 'Chào bạn!' },
    { id: 3, user: 'Lê Văn C', message: 'Mình rất thích bài hát này.' },
    { id: 4, user: 'Nguyễn Văn A', message: 'Cảm ơn bạn đã chia sẻ!' },
    { id: 5, user: 'Trần Thị B', message: 'Bạn có thể giới thiệu thêm bài hát nào không?' },
    { id: 6, user: 'Lê Văn C', message: 'Mình sẽ thêm một vài bài hát vào playlist.' },
    { id: 7, user: 'Nguyễn Văn A', message: 'Tuyệt vời! Mình rất mong chờ.' },
    { id: 8, user: 'Trần Thị B', message: 'Mình cũng vậy!' },
    { id: 9, user: 'Lê Văn C', message: 'Chúng ta hãy cùng nhau thưởng thức nhé!' },
    { id: 10, user: 'Nguyễn Văn A', message: 'Đúng vậy, âm nhạc luôn là sợi dây kết nối mọi người.' },
    { id: 11, user: 'Trần Thị B', message: 'Mình rất vui khi được tham gia phòng nghe nhạc chung này.' },
    { id: 12, user: 'Lê Văn C', message: 'Hy vọng chúng ta sẽ có những giây phút thư giãn tuyệt vời.' },
    { id: 13, user: 'Nguyễn Văn A', message: 'Chắc chắn rồi! Hãy cùng nhau tạo nên những kỷ niệm đẹp.' },
    { id: 14, user: 'Trần Thị B', message: 'Mình rất mong chờ những bài hát mới mà mọi người sẽ chia sẻ.' },
    { id: 15, user: 'Lê Văn C', message: 'Mình cũng vậy! Hãy cùng nhau khám phá âm nhạc mới nhé!' },
    { id: 16, user: 'Nguyễn Văn A', message: 'Âm nhạc luôn là nguồn cảm hứng vô tận.' },
    { id: 17, user: 'Trần Thị B', message: 'Đúng vậy! Mình rất thích cảm giác khi nghe nhạc cùng mọi người.' },
    { id: 18, user: 'Lê Văn C', message: 'Mình cũng vậy! Hãy cùng nhau tạo nên những kỷ niệm âm nhạc đáng nhớ.' },
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
                <button>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </div>
        </div>
    );
}

export default ChatRoom;
