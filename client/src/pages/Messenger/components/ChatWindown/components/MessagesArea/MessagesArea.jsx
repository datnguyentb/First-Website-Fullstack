import classNames from 'classnames/bind';
import styles from './MessagesArea.module.scss';
import { ChatMessage } from './components';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

function MessagesArea({ messages }) {
    const chatContainerRef = useRef(null);

    // Scroll xuống đáy
    const scrollToBottom = () => {
        if (!chatContainerRef.current) return;
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    };

    useEffect(() => {
        if (!chatContainerRef.current) return;

        const el = chatContainerRef.current;

        // Kiểm tra user có đang ở gần đáy không
        const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;

        // Chỉ auto-scroll nếu user đang ở gần đáy
        if (isNearBottom) {
            scrollToBottom();
        }
    }, [messages]);

    return (
        <div ref={chatContainerRef} className={cx('wrapper', 'scrollbar')}>
            {messages.map((message) => (message ? <ChatMessage key={message._id} data={message} /> : null))}
        </div>
    );
}

export default MessagesArea;
