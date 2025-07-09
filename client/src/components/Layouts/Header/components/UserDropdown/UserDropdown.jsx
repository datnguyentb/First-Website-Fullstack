import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
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

const cx = classNames.bind(styles);

const MENU = [
    [
        {
            title: 'Profile',
            onClick: () => {},
            icon: <FontAwesomeIcon icon={faUser} />,
            to: '',
        },
        {
            title: 'Dashboard',
            icon: <FontAwesomeIcon icon={faChartArea} />,
            to: '',
        },
        {
            title: 'My Posts',
            icon: <FontAwesomeIcon icon={faFileLines} />,
            to: '',
        },
        {
            title: 'Notifications',
            icon: <FontAwesomeIcon icon={faBell} />,
            to: '',
        },
    ],
    [
        {
            title: 'Language (vi)',
            icon: <FontAwesomeIcon icon={faEarthAsia} />,
            to: '',
        },
        {
            title: 'Help',
            icon: <FontAwesomeIcon icon={faCircleInfo} />,
            to: '',
        },
        {
            title: 'Log out',
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            to: '',
        },
    ],
];

function UserDropdownPanel({ user_onclick }) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        MENU[0][0].onClick = user_onclick;
    }, []);

    return (
        <div className={cx('wrapper')} tabIndex={-1}>
            <div className={cx('header')}>
                <div className={cx('avatar')}>
                    <Img src="https://i.pravatar.cc/40" alt="avatar" />
                </div>
                <div>
                    <p className={cx('name')}>Nguyễn Tiến Đạt</p>
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
                        <li key={index}>
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
