import { useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRightFromBracket,
    faBell,
    faChartArea,
    faCircleHalfStroke,
    faCircleInfo,
    faEarthAsia,
    faFileLines,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import styles from './UserDropdown.module.scss';
import { Button, Img } from '~/components';
import baseUrl from '~/helper/baseUrl';
import { useUser } from '~/contexts/useUser';

const cx = classNames.bind(styles);

const getUserMenu = (navigate, user_onclick, setUser) => [
    [
        {
            title: 'Profile',
            icon: <FontAwesomeIcon icon={faUser} />,
            onClick: user_onclick,
        },
        {
            title: 'Dashboard',
            icon: <FontAwesomeIcon icon={faChartArea} />,
        },
        {
            title: 'My Posts',
            icon: <FontAwesomeIcon icon={faFileLines} />,
        },
        {
            title: 'Notifications',
            icon: <FontAwesomeIcon icon={faBell} />,
        },
    ],
    [
        {
            title: 'Language (vi)',
            icon: <FontAwesomeIcon icon={faEarthAsia} />,
        },
        {
            title: 'Help',
            icon: <FontAwesomeIcon icon={faCircleInfo} />,
        },
        {
            title: 'Log out',
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            onClick: () => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setUser(null);
                navigate('/auth/login');
            },
        },
    ],
];

function UserDropdownPanel({ user_onclick }) {
    const { user, setUser } = useUser();
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    const MENU = useMemo(() => getUserMenu(navigate, user_onclick, setUser), [navigate, user_onclick, setUser]);

    return (
        <div className={cx('wrapper')} tabIndex={-1}>
            <div className={cx('header')}>
                <div className={cx('avatar')}>
                    <Img src={baseUrl(user.avatarUrl)} alt="avatar" />
                </div>
                <div>
                    <p className={cx('name')}>{`${user.firstName} ${user.lastName}`}</p>
                    <span className={cx('badge')}>BASIC</span>
                </div>
            </div>

            <button className={cx('upgrade-btn')}>Nâng cấp tài khoản</button>

            <div className={cx('section')}>
                <p className={cx('section-title')}>Personal</p>
                <ul>
                    {MENU[0].map((item, index) => (
                        <li key={index} onClick={item.onClick}>
                            <Button className={cx('item')} icon_className={cx('icon')} leftIcon={item.icon}>
                                {item.title}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={cx('section')}>
                <p className={cx('section-title')}>Settings</p>
                <ul>
                    <li className={cx('no-hover')}>
                        <Button
                            className={cx('item')}
                            leftIcon={<FontAwesomeIcon icon={faCircleHalfStroke} />}
                            icon_className={cx('icon')}
                        >
                            Dark mode
                        </Button>
                        <label className={cx('switch')}>
                            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                            <span className={cx('slider')}></span>
                        </label>
                    </li>
                    {MENU[1].map((item, index) => (
                        <li key={index} onClick={item.onClick}>
                            <Button className={cx('item')} icon_className={cx('icon')} leftIcon={item.icon}>
                                {item.title}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default UserDropdownPanel;
