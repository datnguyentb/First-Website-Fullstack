import classNames from 'classnames/bind';
import styles from './AdminHeader.module.scss';

const cx = classNames.bind(styles);

function AdminHeader() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <div className={cx('welcome')}>Xin chào, Admin</div>
                <button className={cx('logout-btn')}>Đăng xuất</button>
            </div>
        </div>
    );
}

export default AdminHeader;
