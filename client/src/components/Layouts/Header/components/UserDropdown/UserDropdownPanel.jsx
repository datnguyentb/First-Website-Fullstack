import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRightFromBracket,
    faBookmark,
    faCircleInfo,
    faEarthAsia,
    faFileLines,
    faRectangleXmark,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import styles from './UserDropdown.module.scss';
import { Button, Img } from '~/components';
import baseUrl from '~/helper/baseUrl';
import { userAuthContext, useUserContext } from '~/contexts';

const cx = classNames.bind(styles);

const getUserMenu = (navigate, user_onclick, logout) => [
    {
        title: 'Personal',
        data: [
            {
                title: 'Profile',
                icon: <FontAwesomeIcon icon={faUser} />,
                onClick: user_onclick,
            },
            {
                title: 'My Posts',
                icon: <FontAwesomeIcon icon={faFileLines} />,
            },
            {
                title: 'Saved Posts',
                icon: <FontAwesomeIcon icon={faBookmark} />,
            },
            {
                title: 'Hidden Posts',
                icon: <FontAwesomeIcon icon={faRectangleXmark} />,
            },
        ],
    },
    {
        title: 'Settings',
        data: [
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
                onClick: async () => {
                    await logout();
                    navigate('/auth/login');
                },
            },
        ],
    },
];

function UserDropdownPanel({ user_onclick }) {
    const { logout } = userAuthContext();
    const { user, setUser } = useUserContext();
    const navigate = useNavigate();

    const MENU = useMemo(() => getUserMenu(navigate, user_onclick, logout), [navigate, user_onclick, logout]);

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

            {MENU.map((item, index) => (
                <div key={index} className={cx('section')}>
                    <p className={cx('section-title')}>{item.title}</p>
                    <ul>
                        {item.data.map((children_item, index_children_item) => (
                            <li key={index_children_item} onClick={children_item.onClick}>
                                <Button
                                    className={cx('item')}
                                    icon_className={cx('icon')}
                                    leftIcon={children_item.icon}
                                >
                                    {children_item.title}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

UserDropdownPanel.propTypes = {
    user_onclick: PropTypes.func,
};

export default UserDropdownPanel;
