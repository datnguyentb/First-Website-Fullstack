import classNames from 'classnames/bind';
import styles from '../ChatWidget.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ChatInput({ handleSendMessage }) {
    const [message, setMessage] = useState('');

    const send = () => {
        const trimmed = message.trim();
        if (!trimmed) return;
        handleSendMessage(trimmed);
        setMessage('');
    };

    return (
        <div className={cx('chat-input')}>
            <input
                type="text"
                placeholder="Type a message..."
                value={message || ''}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault(); // ngăn xuống dòng
                        send();
                    }
                }}
            />
            <button className={cx('sent-btn', message.trim() && 'active')} disabled={!message.trim()} onClick={send}>
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </div>
    );
}

export default ChatInput;
