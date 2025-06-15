import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PlayerControlBar.module.scss';
import { Img, Button, SoundCloudPlayer } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay,
    faPause,
    faShuffle,
    faBackwardStep,
    faForwardStep,
    faRepeat,
    faVolumeHigh,
    faVolumeLow,
    faVolumeOff,
    faVolumeMute,
    faHeart,
    faEllipsis,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function PlayerControlBar({ data, id }) {
    const widgetRef = useRef(null);
    const [currentSong, setCurrentSong] = useState(data.find((song) => song.id === id));
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const widget = widgetRef.current;
        if (!widget) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        widget.bind(window.SC.Widget.Events.PLAY, handlePlay);
        widget.bind(window.SC.Widget.Events.PAUSE, handlePause);

        return () => {
            widget.unbind(window.SC.Widget.Events.PLAY, handlePlay);
            widget.unbind(window.SC.Widget.Events.PAUSE, handlePause);
        };
    }, [currentSong.srcCode]);

    console.log(duration);

    // console.log(duration);

    const togglePlay = () => {
        if (!widgetRef.current) return;

        widgetRef.current.isPaused((paused) => {
            if (paused) {
                widgetRef.current.play();
                setIsPlaying(true);
            } else {
                widgetRef.current.pause();
                setIsPlaying(false);
            }
        });
    };

    const handlechosseSong = () => {
        if (!widgetRef.current) return;
        widgetRef.current.isPaused((paused) => {
            if (paused) {
                widgetRef.current.play();
                setIsPlaying(true);
            } else {
                widgetRef.current.pause();
            }
        });
    };

    const handleForward = () => {
        const currentIndex = data.findIndex((item) => item.id === currentSong.id);

        if (currentIndex !== -1) {
            const nextIndex = (currentIndex + 1) % data.length;
            setCurrentSong(data[nextIndex]);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('d-none')} onClick={handlechosseSong}>
                <SoundCloudPlayer
                    trackId={currentSong.srcCode}
                    ref={widgetRef}
                    onReady={(widget) => {
                        widget.getDuration((dur) => {
                            setDuration(dur);
                        });
                    }}
                />
            </div>

            <div className={cx('now-playing-info')}>
                <div className={cx('song_img', { spinning: isPlaying })}>
                    <Img src={currentSong.thumbnail} />
                </div>
                <div className={cx('song-info')}>
                    <h3 className={cx('song_name')}>{currentSong.title}</h3>
                    <p className={cx('song_art')}>{currentSong.artist}</p>
                </div>
                <div className={cx('more_option')}>
                    <div className={cx('option-icon', 'like')}>
                        {currentSong.isFavorite ? (
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

            <div className={cx('controller')}>
                <div className={cx('main-controller')}>
                    <Button className={cx('active')} style_2 leftIcon={<FontAwesomeIcon icon={faShuffle} />} />
                    <Button style_2 leftIcon={<FontAwesomeIcon icon={faBackwardStep} />} />
                    <Button
                        style_2
                        onClick={togglePlay}
                        leftIcon={<FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />}
                    />
                    <Button onClick={handleForward} style_2 leftIcon={<FontAwesomeIcon icon={faForwardStep} />} />
                    <Button style_2 leftIcon={<FontAwesomeIcon icon={faRepeat} />} />
                </div>

                <div className={cx('timmer', 'mt-4')}>
                    <span className={cx('start_time')}>{formatTime(currentTime)}</span>
                    <div className={cx('timer_line')}></div>
                    <span className={cx('end_time')}>{formatTime(duration)}</span>
                </div>
            </div>
            <div className={cx('player-utils')}>
                <div className={cx('volume', 'd-flex')}>
                    <div>
                        <div className={cx('volume-icon', 'volume_high')}>
                            <FontAwesomeIcon icon={faVolumeHigh} />
                        </div>
                        <div className={cx('volume-icon', 'volume_low', 'd-none')}>
                            <FontAwesomeIcon icon={faVolumeLow} />
                        </div>
                        <div className={cx('volume-icon', 'volume_off', 'd-none')}>
                            <FontAwesomeIcon icon={faVolumeOff} />
                        </div>
                        <div className={cx('volume-icon', 'volume_xmark', 'd-none')}>
                            <FontAwesomeIcon icon={faVolumeMute} />
                        </div>
                    </div>
                    <div className={cx('sound-percent')}>
                        <div className={cx('sound-percent-line')}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayerControlBar;
