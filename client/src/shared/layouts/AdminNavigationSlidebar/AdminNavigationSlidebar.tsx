import classNames from 'classnames/bind';
import styles from './AdminNavigationSlidebar.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { AdminMenuItem } from './types/adminNavigation.type';

const cx = classNames.bind(styles);

const ADMIN_MENU: AdminMenuItem[] = [
    { id: 1, title: 'Dashboard', to: '/admin/dashboard' },
    { id: 2, title: 'Users', to: '/admin/users' },
    { id: 3, title: 'Posts', to: '/admin/posts' },
    { id: 4, title: 'Music Manage', to: '/admin/music' },
    { id: 5, title: 'Settings', to: '/admin/setting' },
];

function AdminNavigationSlidebar() {
    const location = useLocation();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>Admin</div>
            <ul>
                {ADMIN_MENU.map((item) => (
                    <li key={item.id}>
                        <Link
                            to={item.to}
                            className={cx({
                                active: location.pathname === item.to,
                            })}
                        >
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminNavigationSlidebar;
