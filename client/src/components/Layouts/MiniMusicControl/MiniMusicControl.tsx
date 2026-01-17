import classNames from 'classnames/bind';
import styles from './MiniMusicControl.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { usePlayerContext } from '~/contexts';

const cx = classNames.bind(styles);

function MiniMusicControl() {
    const { currentSong, isPlaying, pauseSong, playSong } = usePlayerContext();

    if (!currentSong) {
        return <div className={cx('floating-music-player')}>No song playing</div>;
    }

    return (
        <div className={cx('floating-music-player')}>
            <div className={cx('initial-icon')}>
                <FontAwesomeIcon className={cx('fa-compact-disc', !isPlaying && 'paused')} icon={faCompactDisc} />
            </div>

            <div className={cx('control-panel')}>
                <span className={cx('track-title')}>🎵 {currentSong.name}</span>

                <button
                    className={cx('toggle-btn')}
                    id={cx('playPauseBtn')}
                    aria-label="Tắt/Bật Nhạc"
                    onClick={() => {
                        if (isPlaying) {
                            pauseSong();
                        } else {
                            playSong();
                        }
                    }}
                >
                    {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                </button>
            </div>
        </div>
    );
}

export default MiniMusicControl;
