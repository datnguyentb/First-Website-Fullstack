import classNames from 'classnames/bind';
import styles from '../ChatWidget.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ChatInput() {
    return (
        <div className={cx('chat-input')}>
            <input type="text" placeholder="Type a message..." />
            <button>
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </div>
    );
}

export default ChatInput;
