import classNames from 'classnames/bind';
import styles from './AdminHeader.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAdminAuthContext } from '~/contexts';

const cx = classNames.bind(styles);

function AdminHeader() {
    const navigate = useNavigate();
    const { logout } = useAdminAuthContext();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
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
