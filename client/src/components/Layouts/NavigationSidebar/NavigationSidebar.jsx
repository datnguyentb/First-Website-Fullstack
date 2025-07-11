import classNames from 'classnames/bind';
import styles from './NavigationSidebar.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faListCheck, faMusic, faMessage, faUserGroup, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { logo_img } from '~/assets/imgs/logo'; // chỉnh đường dẫn phù hợp
import { Button, Img } from '~/components';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const navOptions = [
    {
        title: 'Feed',
        icon: faHome,
        link: '/',
        badge: 37,
    },
    {
        title: 'TodoList',
        icon: faListCheck,
        link: '/todo',
    },
    {
        title: 'Music Player',
        icon: faMusic,
        link: '/music',
    },
    {
        title: 'Messages',
        icon: faMessage,
        link: '/messages',
    },
    {
        title: 'Together',
        icon: faUserGroup,
        link: '/together',
    },
    {
        title: 'About',
        icon: faCircleInfo,
        link: '/about',
    },
];

function NavigationSidebar() {
    const location = useLocation();
    const [userLogin, setUserLogin] = useState(null);
    useEffect(() => {
        setUserLogin(JSON.parse(localStorage.getItem('user')));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('logo')}>
                    <Img src={logo_img.main_logo} alt="Twirl" />
                </div>

                <nav className={cx('nav')}>
                    {navOptions.map((item, index) => (
                        <Link
                            key={index}
                            to={item.link}
                            className={cx('nav-item', {
                                active: location.pathname === item.link,
                            })}
                        >
                            <FontAwesomeIcon icon={item.icon} />
                            <span className={cx('title')}>{item.title}</span>
                            {item.badge && <span className={cx('badge')}>{item.badge}</span>}
                        </Link>
                    ))}
                </nav>

                <hr className={cx('line')} />

                {!userLogin && (
                    <div className={cx('sign-in-box')}>
                        <p>Sign in to access your personalized features</p>
                        <Button to="/auth/login" className={cx('sign-in-btn')} rounded>
                            Sign in
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NavigationSidebar;
