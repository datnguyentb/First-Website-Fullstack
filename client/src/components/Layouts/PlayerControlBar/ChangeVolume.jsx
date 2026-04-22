import classNames from 'classnames/bind';
import styles from './PlayerControlBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeLow, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { usePlayerContext } from '~/contexts';
import { useState } from 'react';
import { Button } from '~/components';

const cx = classNames.bind(styles);

function ChangeVolume() {
    const { volume, setVolume } = usePlayerContext();
    const [prevVolume, setPrevVolume] = useState(100); // lưu volume trước khi mute

    const toggleMute = () => {
        if (volume === 0) {
            // unmute: trở về volume trước đó
            setVolume(prevVolume > 0 ? prevVolume : 50);
        } else {
            // mute: lưu volume hiện tại
            setPrevVolume(volume);
            setVolume(0);
        }
    };

    // Hàm xử lý lăn chuột
    const handleWheel = (e) => {
        const step = 5; // Mỗi lần cuộn tăng/giảm 5 đơn vị
        let newVolume = volume;

        if (e.deltaY < 0) {
            // Cuộn lên -> Tăng volume
            newVolume = Math.min(100, volume + step);
        } else {
            // Cuộn xuống -> Giảm volume
            newVolume = Math.max(0, volume - step);
        }

        setVolume(newVolume);
        if (newVolume > 0) setPrevVolume(newVolume);
    };

    return (
        <div className={cx('player-utils')}>
            <div className={cx('volume', 'd-flex')} onWheel={handleWheel}>
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
