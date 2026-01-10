import classNames from 'classnames/bind';
import styles from '../RoomView.module.scss';
import { Img } from '~/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faForwardStep, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function MusicPlayer() {
    return (
        <div className={cx('music-player')}>
            <div className={cx('music-player-info')}>
                <div className={cx('song-avatar')}>
                    <Img src="https://via.placeholder.com/150" />
                </div>
                <div className={cx('song-details')}>
                    <h3 className={cx('song-title')}>Cơn Mưa Ngang Qua</h3>
                    <p className={cx('song-artist')}>Trịnh Công Sơn</p>
                </div>
            </div>
            <div className={cx('music-player-controls')}>
                <div className={cx('control-buttons')}>
                    <button className={cx('prev-btn')}>
                        <FontAwesomeIcon icon={faBackwardStep} />
                    </button>
                    {/* <button className={cx('play-btn')}>
                        <FontAwesomeIcon icon={faPlay} />
                    </button> */}
                    <button className={cx('pause-btn')}>
                        <FontAwesomeIcon icon={faPause} />
                    </button>
                    <button className={cx('next-btn')}>
                        <FontAwesomeIcon icon={faForwardStep} />
                    </button>
                </div>
                <div className={cx('progress-bar')}>
                    <span className={cx('progress-time')}>1:20</span>
                    <div className={cx('progress-filled')}></div>
                    <span className={cx('progress-time')}>3:45</span>
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer;
