import classNames from 'classnames/bind';
import styles from './AdminHeader.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function AdminHeader() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('admin');
        navigate('/admin');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <div className={cx('welcome')}>Welcome, Admin</div>
                <button className={cx('logout-btn')} onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default AdminHeader;
