import classNames from 'classnames/bind';
import styles from './MusicNavigationSlidebar.module.scss';
import { logo_img } from '~/assets/imgs/logo';
import { Img } from '~/components';
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
import { Button } from '~/components';

const cx = classNames.bind(styles);

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

function MusicNavigationSlidebar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('logo-wrapper')}>
                    <div className={cx('logo')}>
                        <Img src={logo_img.main_logo} />
                    </div>
                    <div className={cx('title')}>Twirl</div>
                </div>
                <div className={cx('slogan')}>Spin Your Vibe</div>
            </div>
            <div className={cx('nav-list')}>
                {MENU.map((item, index) => (
                    <div key={index} className={cx('nav-item', index === 0 && 'active')}>
                        <div className={cx('icon')}>{item.icon}</div>
                        <div className={cx('title')}>{item.title}</div>
                    </div>
                ))}
            </div>
            <hr className={cx('line')} />
            <div className={cx('playlist')}>
                <div className={cx('playlist-wrapper')}>
                    <div className={cx('playlist-title')}>Your Playlists</div>
                    <div className={cx('playlist-list')}>
                        <div className={cx('playlist-item', 'active')}>
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faHeart} />
                            </div>
                            <span>Favorites</span>
                        </div>
                        <div className={cx('playlist-item')}>
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faClockRotateLeft} />
                            </div>
                            <span>Recently Played</span>
                        </div>
                        <div className={cx('playlist-item')}>
                            <span>V-Pop nhẹ nhàng như những tia nắng mỏng manh của ngày nè</span>
                        </div>
                    </div>
                </div>

                <Button outline className={cx('add-btn')}>
                    <FontAwesomeIcon className={cx('me-2')} icon={faPlus} />
                    Add Playlist
                </Button>
            </div>
        </div>
    );
}

export default MusicNavigationSlidebar;
