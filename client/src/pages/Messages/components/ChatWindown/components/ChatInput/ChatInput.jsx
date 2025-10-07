import { useState } from 'react';
import classNames from 'classnames/bind';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './ChatInput.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function ChatInput() {
    const [text, setText] = useState('');
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            // Handle sending message
            console.log('Send message:', text);
            setText('');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <button className={cx('attach-btn')}>
                <FontAwesomeIcon icon={faPaperclip} />
            </button>
            <div className={cx('input-wrapper')}>
                <TextareaAutosize
                    spellCheck={false}
                    className={cx('chat-input')}
                    placeholder="Type a message..."
                    minRows={1}
                    maxRows={6}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            {text ? (
                <button
                    className={cx('send-btn', 'active')}
                    onClick={() => {
                        console.log('Send message:', text);
                        setText('');
                    }}
                >
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            ) : (
                <button className={cx('emoji-btn')}>😊</button>
            )}
        </div>
    );
}

export default ChatInput;
