import classNames from 'classnames/bind';
import styles from '../RoomView.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('header')}>
            <h2 className={cx('title')}>
                Phòng: <span className={cx('room-name')}>CHILL42</span>
            </h2>
            <button className={cx('leave-btn')}>Rời Phòng</button>
        </div>
    );
}

export default Header;
