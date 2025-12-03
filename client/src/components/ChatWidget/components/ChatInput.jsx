import classNames from 'classnames/bind';
import styles from '../ChatWidget.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ChatInput({ handleSendMessage }) {
    const [message, setMessage] = useState('');
    return (
        <div className={cx('chat-input')}>
            <input
                type="text"
                placeholder="Type a message..."
                onChange={(e) => {
                    setMessage(e.target.value);
                }}
            />
            <button>
                <FontAwesomeIcon
                    icon={faPaperPlane}
                    onClick={() => {
                        handleSendMessage(message);
                    }}
                />
            </button>
        </div>
    );
}

export default ChatInput;
