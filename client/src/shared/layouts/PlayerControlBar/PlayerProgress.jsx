import classNames from 'classnames/bind';
import styles from './PlayerControlBar.module.scss';
import { formatSongTime } from '~/utils/dateUtils';
import { usePlayerContext } from '~/contexts';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function PlayerProgress() {
    const { audioRef, seek } = usePlayerContext();
    const [currentTime, setCurrentTime] = useState(audioRef.current.currentTime || 0);
    const [duration, setDuration] = useState(audioRef.current.duration || 0);

    useEffect(() => {
        const audio = audioRef.current;

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoaded = () => setDuration(audio.duration);

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoaded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoaded);
        };
    }, [audioRef]);

    const handleChange = (e) => {
        const newTime = Number(e.target.value);
        setCurrentTime(newTime);
        seek(newTime);
    };

    return (
        <div className={cx('timmer', 'mt-4')}>
            <span className={cx('start_time')}>{formatSongTime(currentTime)}</span>
            <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                step="0.1"
                onChange={handleChange}
                className={cx('timer_line')}
            />
            <span className={cx('end_time')}>{formatSongTime(duration)}</span>
        </div>
    );
}

export default PlayerProgress;
