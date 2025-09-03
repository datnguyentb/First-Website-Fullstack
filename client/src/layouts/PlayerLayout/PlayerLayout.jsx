import classNames from 'classnames/bind';
import styles from './PlayerLayout.module.scss';
import { Header, MusicNavigationSlidebar, RightSlidebarMusicPlayer, PlayerControlBar } from '../../components/Layouts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ProtectedUserRoute } from '~/components/ProtectedRoute';

const cx = classNames.bind(styles);

function PlayerLayout({ children }) {
    return (
        <ProtectedUserRoute>
            <div className={cx('wrapper', 'd-flex')}>
                <div className={cx('main-content')}>
                    <div className={cx('header')}>
                        <Header style_2 />
                        <Link to={'/'} title="Go Home" className={cx('go-home')}>
                            <FontAwesomeIcon icon={faHome} />
                        </Link>
                    </div>
                    <div className={cx('left-slidebar')}>
                        <MusicNavigationSlidebar />
                    </div>
                    <div className={cx('content-container', 'd-flex')}>
                        <div className={cx('content', 'flex-grow-1')}>
                            <div className={cx('primary-content')}>{children}</div>
                        </div>
                    </div>
                    <div className="right-slidebar">
                        <RightSlidebarMusicPlayer />
                    </div>
                    <div className={cx('media-control-bar')}>
                        <PlayerControlBar />
                    </div>
                </div>
            </div>
        </ProtectedUserRoute>
    );
}

export default PlayerLayout;
