import classNames from 'classnames/bind';
import styles from './PlaylistItems.module.scss';
import { faClockRotateLeft, faHeart } from '@fortawesome/free-solid-svg-icons';
import PlaylistItem from '../PlaylistItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePlaylistContext } from '~/contexts';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function PlaylistItems() {
    const { playlists } = usePlaylistContext();
    return (
        <div className={cx('playlist-wrapper')}>
            <div className={cx('playlist-title')}>Your Playlists</div>
            <div className={cx('playlist-list', 'scrollbar')}>
                <Link to="/music/playlist/favorite" className={cx('playlist-item', 'active')}>
                    <div className={cx('icon')}>
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <span>Favorites</span>
                </Link>
                <div className={cx('playlist-item')}>
                    <div className={cx('icon')}>
                        <FontAwesomeIcon icon={faClockRotateLeft} />
                    </div>
                    <span>Recently Played</span>
                </div>
                {playlists?.length != 0 &&
                    playlists.map((playlist) => <PlaylistItem key={playlist._id} playlist={playlist} />)}
            </div>
        </div>
    );
}

export default PlaylistItems;
