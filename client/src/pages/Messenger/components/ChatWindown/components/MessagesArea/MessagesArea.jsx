import classNames from 'classnames/bind';
import styles from './MessagesArea.module.scss';
import { ChatMessage } from './components';
import { useEffect, useRef } from 'react';
const cx = classNames.bind(styles);

function MessagesArea({ messages, setMessages }) {
    const chatContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, []);

    return (
        <div className={cx('wrapper', 'scrollbar')} ref={chatContainerRef}>
            {messages.map((message, index) => message && <ChatMessage key={index} data={message} />)}
        </div>
    );
}

export default MessagesArea;
