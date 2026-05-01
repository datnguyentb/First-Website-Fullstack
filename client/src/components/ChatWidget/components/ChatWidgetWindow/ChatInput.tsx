import classNames from 'classnames/bind';
import styles from './ChatWidgetWindow.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import useSendMessage from '~/socket/hook/messages/useSendMessange';
import { ChatInputProps } from '../ChatWidgetTypes';

const cx = classNames.bind(styles);

const ChatInput: React.FC<ChatInputProps> = ({ conversationId }) => {
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
        <div className={cx('chat-input')}>
            <input
                type="text"
                placeholder="Type a message..."
                value={inputValue || ''}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus={true}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault(); // ngăn xuống dòng
                        send();
                    }
                }}
            />
            <button
                className={cx('sent-btn', inputValue.trim() && 'active')}
                disabled={!inputValue.trim()}
                onClick={send}
            >
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </div>
    );
};

export default ChatInput;
