import classNames from 'classnames/bind';
import styles from './NavigationSidebar.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faListCheck,
    faMusic,
    faMessage,
    faUserGroup,
    faCircleInfo,
    faGuitar,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { logo_img } from '~/assets/imgs/logo';
import { Img } from '~/components';

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
        title: 'Messenger',
        icon: faMessage,
        link: '/messenger',
    },
    {
        title: 'Co-Listening',
        icon: faGuitar,
        link: '/co-listening',
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

function NavigationSidebar({ collapsed = false }) {
    const location = useLocation();

    return (
        <div className={cx('wrapper', { collapsed })}>
            <div className={cx('container')}>
                <div>
                    <div className={cx('logo')}>
                        <Img src={logo_img.main_logo} alt="Twirl" sourceType="fontend" />
                    </div>
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
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={item.icon} />
                            </div>
                            <span className={cx('title')}>{item.title}</span>
                            {item.badge && <span className={cx('badge')}>{item.badge}</span>}
                        </Link>
                    ))}
                </nav>

                <hr className={cx('line')} />
            </div>
        </div>
    );
}

export default NavigationSidebar;
