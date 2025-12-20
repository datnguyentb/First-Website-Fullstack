import classNames from 'classnames/bind';
import styles from './ChatMessage.module.scss';
import { formatTimeWithDay } from '~/utils/dateUtils';
import { useUserContext } from '~/contexts';
const cx = classNames.bind(styles);

function ChatMessage({ data }) {
    const { user } = useUserContext();
    return (
        <div className={cx('wrapper', data.sender._id === user._id ? 'sent' : 'received')}>
            <p>{data.content}</p>
            <span className={cx('timestamp')}>{formatTimeWithDay(data.timestamp)}</span>
        </div>
    );
}

export default ChatMessage;
