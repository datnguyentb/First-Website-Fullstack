import classNames from 'classnames/bind';
import styles from './MessagesArea.module.scss';
const cx = classNames.bind(styles);

function MessagesArea() {
    return <div className={cx('wrapper')}>MessagesArea</div>;
}

export default MessagesArea;
