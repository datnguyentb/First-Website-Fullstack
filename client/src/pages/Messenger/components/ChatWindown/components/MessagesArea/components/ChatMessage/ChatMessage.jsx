import classNames from 'classnames/bind';
import styles from './ChatMessage.module.scss';
import { formatTimeWithDay } from '~/utils/dateUtils';
const cx = classNames.bind(styles);

function ChatMessage({ data }) {
    const isSenderMe = data.senderId === 'u_me';
    return (
        <div className={cx('wrapper', isSenderMe ? 'sent' : 'received')}>
            <p>{data.content}</p>
            <span className={cx('timestamp')}>{formatTimeWithDay(data.timestamp)}</span>
        </div>
    );
}

export default ChatMessage;
