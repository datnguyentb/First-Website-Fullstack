import classNames from 'classnames/bind';
import styles from './PlayerControlBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeLow, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { usePlayerContext } from '~/contexts';
import { useEffect, useState } from 'react';
import { Button } from '~/components';

const cx = classNames.bind(styles);

function ChangeVolume() {
    const { audioRef, volume, setVolume } = usePlayerContext();
    const [prevVolume, setPrevVolume] = useState(100); // lưu volume trước khi mute

    useEffect(() => {
        const audio = audioRef.current;
        if (volume > 100) {
            audio.volume = 1;
            setVolume(100);
            localStorage.setItem('volume', 100);
        } else if (volume < 0) {
            audio.volume = 0;
            setVolume(0);
            localStorage.setItem('volume', 0);
        } else {
            audio.volume = volume / 100;
            localStorage.setItem('volume', volume);
        }
    }, [volume, audioRef]);

    const toggleMute = () => {
        if (volume === 0) {
            // unmute: trở về volume trước đó
            setVolume(prevVolume > 0 ? prevVolume : 50); // nếu chưa có prevVolume thì 50
        } else {
            // mute: lưu volume hiện tại
            setPrevVolume(volume);
            setVolume(0);
        }
    };

    return (
        <div className={cx('player-utils')}>
            <div className={cx('volume', 'd-flex')}>
                <div className={cx('volume-control', 'd-flex')}>
                    <Button
                        style_2
                        className={cx('volume-icon')}
                        leftIcon={
                            volume >= 50 ? (
                                <FontAwesomeIcon icon={faVolumeHigh} />
                            ) : volume > 0 ? (
                                <FontAwesomeIcon icon={faVolumeLow} />
                            ) : (
                                <FontAwesomeIcon icon={faVolumeMute} />
                            )
                        }
                        onClick={toggleMute}
                    />

                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => {
                            const newVol = parseInt(e.target.value);
                            setVolume(newVol);
                            if (newVol > 0) setPrevVolume(newVol);
                        }}
                        className={cx('volume-slider', 'ms-2')}
                    />
                </div>
            </div>
        </div>
    );
}

export default ChangeVolume;
