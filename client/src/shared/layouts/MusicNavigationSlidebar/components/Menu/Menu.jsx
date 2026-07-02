import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCompass, faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

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
];

const cx = classNames.bind(styles);

function Menu() {
    return (
        <div className={cx('nav-list')}>
            {MENU.map((item, index) => (
                <Link to={item.to} key={index} className={cx('nav-item', index === 0 && 'active')}>
                    <div className={cx('icon')}>{item.icon}</div>
                    <div className={cx('title')}>{item.title}</div>
                </Link>
            ))}
        </div>
    );
}

export default Menu;
