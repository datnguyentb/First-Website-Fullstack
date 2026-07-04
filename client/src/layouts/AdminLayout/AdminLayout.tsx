import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import React from 'react';
import { ProtectedAdminRoute } from '~/components/ProtectedRoute';
import AdminHeader from '~/shared/layouts/AdminHeader';
import AdminNavigationSlidebar from '~/shared/layouts/AdminNavigationSlidebar';

const cx = classNames.bind(styles);

function AdminLayout({ children }: { children: React.ReactNode }) {
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
