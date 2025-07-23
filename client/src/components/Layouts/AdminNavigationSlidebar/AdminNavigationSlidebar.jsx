import classNames from 'classnames/bind';
import styles from './AdminNavigationSlidebar.module.scss';
import { Link, useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

const MENU = [
    {
        title: 'Dashboard',
        to: '/admin/dashboard',
    },
    {
        title: 'Users',
        to: '/admin/users',
    },
    {
        title: 'Posts',
        to: '/admin/posts',
    },
    {
        title: 'Settings',
        to: '/admin/setting',
    },
];

function AdminNavigationSlidebar() {
    const location = useLocation();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>Admin</div>
            <ul>
                {MENU.map((item, index) => (
                    <li key={index}>
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
