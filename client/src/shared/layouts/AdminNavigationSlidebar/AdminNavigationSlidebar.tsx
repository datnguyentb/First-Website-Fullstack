import classNames from 'classnames/bind';
import styles from './AdminNavigationSlidebar.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { ADMIN_MENU } from '~/constants/ADMIN_MENU';

const cx = classNames.bind(styles);

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
