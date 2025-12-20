import classNames from 'classnames/bind';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './ChatInput.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import useSendMessage from '~/socket/hook/messages/useSendMessange';
const cx = classNames.bind(styles);

function ChatInput({ conversationId }) {
    const [inputValue, setInputValue] = useState('');
    const { sendMessage } = useSendMessage();

    const send = () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;
        const data = {
            conversation: conversationId,
            content: inputValue,
        };
        sendMessage(data);
        setInputValue('');
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
                    value={inputValue || ''}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault(); // ngăn xuống dòng
                            send();
                        }
                    }}
                />
            </div>
            {inputValue ? (
                <button className={cx('send-btn', 'active')} onClick={send} disabled={!inputValue.trim()}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            ) : (
                <button
                    onClick={() => {
                        alert('sent icon');
                        // handleSendIcon();
                    }}
                    className={cx('emoji-btn')}
                >
                    😊
                </button>
            )}
        </div>
    );
}

export default ChatInput;
