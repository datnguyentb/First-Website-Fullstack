import classNames from 'classnames/bind';
import styles from './ChatWidgetWindow.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function NoChatSelected({ onClose }) {
    return (
        <div className={cx('no-chat-selected')}>
            <div className={cx('message-icon')}>💬</div>
            <h3>No Chat Selected</h3>
            <span>Please select a chat to start messaging.</span>

            <div className={cx('close-chatwidget-no-chat', 'chat-action-btn')} onClick={() => onClose(false)}>
                <FontAwesomeIcon icon={faClose} />
            </div>
        </div>
    );
}

export default NoChatSelected;
