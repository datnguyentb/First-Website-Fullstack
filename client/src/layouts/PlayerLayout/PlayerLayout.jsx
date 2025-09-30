import classNames from 'classnames/bind';
import styles from './PlayerLayout.module.scss';
import { MusicNavigationSlidebar, RightSlidebarMusicPlayer, PlayerControlBar } from '../../components/Layouts';
import { ProtectedUserRoute } from '~/components/ProtectedRoute';
import { PlaylistProvider } from '~/contexts/PlaylistContext';
import { FavoriteProvider } from '~/contexts/FavoriteContext';
import MusicSearch from './MusicSearch';

const cx = classNames.bind(styles);

function PlayerLayout({ children }) {
    return (
        <ProtectedUserRoute>
            <FavoriteProvider>
                <PlaylistProvider>
                    <div className={cx('wrapper', 'd-flex')}>
                        <div className={cx('main-content')}>
                            <div className={cx('left-slidebar')}>
                                <MusicNavigationSlidebar />
                            </div>
                            <div className={cx('content-container', 'd-flex')}>
                                <div className={cx('content-cover')}>
                                    <MusicSearch />
                                    <div className={cx('content', 'flex-grow-1')}>
                                        <div className={cx('primary-content')}>{children}</div>
                                    </div>
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
                </PlaylistProvider>
            </FavoriteProvider>
        </ProtectedUserRoute>
    );
}

export default PlayerLayout;
