import classNames from 'classnames/bind';
import styles from '../RoomView.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('header')}>
            <h2 className={cx('title')}>
                Phòng: <span className={cx('room-name')}>CHILL42</span>
            </h2>
            <Link to="/co-listening" className={cx('leave-btn', 'transition-all')}>
                <span>Leave Room</span>
            </Link>
        </div>
    );
}

export default Header;
