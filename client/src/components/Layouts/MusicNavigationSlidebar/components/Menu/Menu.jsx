import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBook,
    faBullseye,
    faClockRotateLeft,
    faCompass,
    faHeart,
    faMusic,
    faPlus,
    faRankingStar,
} from '@fortawesome/free-solid-svg-icons';

const MENU = [
    {
        title: 'Explore',
        to: '/music',
        icon: <FontAwesomeIcon icon={faCompass} />,
    },
    {
        title: 'Library',
        to: '/music/library',
        icon: <FontAwesomeIcon icon={faBook} />,
    },
    {
        title: 'Ranking',
        to: '/music/rank',
        icon: <FontAwesomeIcon icon={faRankingStar} />,
    },
    {
        title: 'Themes',
        to: '/music/theme',
        icon: <FontAwesomeIcon icon={faBullseye} />,
    },
    {
        title: 'New Music',
        to: '/music/new',
        icon: <FontAwesomeIcon icon={faMusic} />,
    },
];

const cx = classNames.bind(styles);

function Menu() {
    return (
        <div className={cx('nav-list')}>
            {MENU.map((item, index) => (
                <div key={index} className={cx('nav-item', index === 0 && 'active')}>
                    <div className={cx('icon')}>{item.icon}</div>
                    <div className={cx('title')}>{item.title}</div>
                </div>
            ))}
        </div>
    );
}

export default Menu;
