import classNames from 'classnames/bind';
import styles from './PlayerControlBar.module.scss';
import { Img, Button } from '~/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faHeart } from '@fortawesome/free-solid-svg-icons';
import { usePlayer } from '~/contexts';

const cx = classNames.bind(styles);
const isFavorite = true;

function NowPlayingInfo() {
    const { currentSong, isPlaying } = usePlayer();
    if (!currentSong) {
        return <div className={cx('now-playing-info')}>No song playing</div>;
    }
    const url = currentSong ? currentSong?.album?.images[2]?.url : '';
    const artistsNames = currentSong ? currentSong?.artists?.map((artist) => artist.name).join(', ') : 'uknown';

    return (
        <div className={cx('now-playing-info')}>
            <div className={cx('song_img', { spinning: isPlaying })}>
                <Img src={url} />
            </div>
            <div className={cx('song-info')}>
                <h3 className={cx('song_name')}>{currentSong.name}</h3>
                <p className={cx('song_art')}>{artistsNames}</p>
            </div>
            <div className={cx('more_option')}>
                <div className={cx('option-icon', 'like')}>
                    {isFavorite ? (
                        <Button style_2 leftIcon={<FontAwesomeIcon className={cx('liked')} icon={faHeart} />} />
                    ) : (
                        <Button
                            style_2
                            leftIcon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className={cx('bi', 'bi-heart')}
                                    viewBox="0 0 16 16"
                                >
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                </svg>
                            }
                        />
                    )}
                </div>
                <div className={cx('option-icon', 'more', 'ms-3')}>
                    <Button style_2 leftIcon={<FontAwesomeIcon icon={faEllipsis} />} />
                </div>
            </div>
        </div>
    );
}

export default NowPlayingInfo;
