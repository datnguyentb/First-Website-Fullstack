import classNames from 'classnames/bind';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './ChatInput.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function ChatInput({ textInput, setTextInput, handleSend, handleSendIcon, handleKeyDown }) {
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
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            {textInput ? (
                <button className={cx('send-btn', 'active')} onClick={handleSend} disabled={!textInput.trim()}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            ) : (
                <button
                    onClick={() => {
                        handleSendIcon();
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
