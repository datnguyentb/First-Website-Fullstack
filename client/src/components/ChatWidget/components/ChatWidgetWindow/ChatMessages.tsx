import classNames from 'classnames/bind';
import styles from './ChatWidgetWindow.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useUserContext } from '~/contexts';

const cx = classNames.bind(styles);

function ChatMessages({ messages }) {
    const chatContainerRef = useRef(null);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const { user } = useUserContext();

    // bắt sự kiện scroll để theo dõi vị trí cuộn
    useEffect(() => {
        const handleScroll = () => {
            const el = chatContainerRef.current;
            if (!el) return;

            const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;

            // Nếu còn cách đáy dưới 100px → coi như "ở gần cuối"
            setIsAtBottom(distanceToBottom < 100);
        };

        const el = chatContainerRef.current;
        el.addEventListener('scroll', handleScroll);

        return () => el.removeEventListener('scroll', handleScroll);
    }, []);

    // tự động cuộn xuống đáy khi có tin nhắn mới, nếu đang ở gần đáy
    useEffect(() => {
        const el = chatContainerRef.current;
        if (!el) return;

        // Chỉ tự cuộn nếu đang ở gần đáy
        if (isAtBottom) {
            el.scrollTop = el.scrollHeight;
        }
    }, [messages, isAtBottom]);

    return (
        <div ref={chatContainerRef} className={cx('chat-messages', 'scrollbar')}>
            {messages.map((msg) => (
                <div key={msg._id} className={cx('message', msg.sender._id === user._id ? 'sent' : 'received')}>
                    <div className={cx('message-content')}>{msg.content}</div>
                    {msg.status === 'pending' && (
                        <div className={cx('message-status')}>
                            <div className={cx('status-sending')}></div>
                            <p>Đang gửi</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ChatMessages;
