import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import { AdminHeader, AdminNavigationSlidebar } from '~/components/Layouts';
import { ProtectedAdminRoute } from '~/components/ProtectedRoute';

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    return (
        <ProtectedAdminRoute>
            <div className={cx('wrapper')}>
                <div className={cx('slidebar')}>
                    <AdminNavigationSlidebar />
                </div>
                <div className={cx('header')}>
                    <AdminHeader />
                </div>
                <div className={cx('content')}>{children}</div>
            </div>
        </ProtectedAdminRoute>
    );
}

export default AdminLayout;
