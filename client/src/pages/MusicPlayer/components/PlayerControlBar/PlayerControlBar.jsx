import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PlayerControlBar.module.scss';
import { Button } from '~/components';
import PlayerProgress from './PlayerProgress.jsx';
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
    faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';
import { usePlayer } from '~/contexts';
import NowPlayingInfo from './NowPlayingInfo';
import ChangeVolume from './ChangeVolume';

const cx = classNames.bind(styles);

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function PlayerControlBar({ data, id, onSongChange }) {
    const { playSong, setIsShuffle, pauseSong, isPlaying, isShuffle, nextSong, prevSong, playMode, setPlayMode } =
        usePlayer();
    const [currentSong, setCurrentSong] = useState(data.find((song) => song.id === id));
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    //Forward btn
    const handleForward = useCallback(() => {
        const currentIndex = data.findIndex((item) => item.id === currentSong.id);

        if (currentIndex !== -1) {
            const nextIndex = (currentIndex + 1) % data.length;
            const nextSong = data[nextIndex];
            setCurrentSong(nextSong);

            if (onSongChange) {
                onSongChange(nextSong);
            }
        }
    }, [data, currentSong, onSongChange]);

    //Backward btn
    const handleBackward = () => {
        const currentIndex = data.findIndex((item) => item.id === currentSong.id);

        if (currentIndex > 0) {
            const prevSong = data[currentIndex - 1];
            setCurrentSong(prevSong);

            if (onSongChange) {
                onSongChange(prevSong);
            }
        }
    };

    const handleChangePlayMode = () => {
        if (playMode === 'normal') {
            setPlayMode('repeat-all');
        } else if (playMode === 'repeat-all') {
            setPlayMode('repeat-one');
        } else {
            setPlayMode('normal');
        }
    };

    //Set CurrentSong
    useEffect(() => {
        const newSong = data.find((song) => song.id === id);
        if (newSong) {
            setCurrentSong(newSong);
        }
    }, [id, data]);

    return (
        <div className={cx('wrapper')}>
            <NowPlayingInfo />

            <div className={cx('controller')}>
                <div className={cx('main-controller')}>
                    <Button
                        className={cx(isShuffle && 'active')}
                        style_2
                        leftIcon={<FontAwesomeIcon icon={faShuffle} />}
                        onClick={() => setIsShuffle(!isShuffle)}
                    />
                    <Button
                        onClick={handleBackward}
                        style_2
                        leftIcon={
                            <FontAwesomeIcon
                                icon={faBackwardStep}
                                onClick={() => {
                                    prevSong();
                                }}
                            />
                        }
                    />

                    {isPlaying ? (
                        <Button
                            style_2
                            onClick={() => {
                                pauseSong();
                            }}
                            leftIcon={<FontAwesomeIcon icon={faPause} />}
                        />
                    ) : (
                        <Button
                            style_2
                            onClick={() => {
                                playSong();
                            }}
                            leftIcon={<FontAwesomeIcon icon={faPlay} />}
                        />
                    )}
                    <Button
                        onClick={handleForward}
                        style_2
                        leftIcon={
                            <FontAwesomeIcon
                                icon={faForwardStep}
                                onClick={() => {
                                    nextSong();
                                }}
                            />
                        }
                    />

                    <Button
                        className={cx(playMode !== 'normal' && 'active')}
                        style_2
                        onClick={handleChangePlayMode}
                        leftIcon={
                            playMode === 'repeat-one' ? (
                                <i className={cx('bi', 'bi-repeat-1', 'repeat-1-icon')}></i>
                            ) : (
                                <FontAwesomeIcon icon={faRepeat} />
                            )
                        }
                    />
                </div>

                <PlayerProgress />
            </div>
            <ChangeVolume />
        </div>
    );
}

export default PlayerControlBar;
