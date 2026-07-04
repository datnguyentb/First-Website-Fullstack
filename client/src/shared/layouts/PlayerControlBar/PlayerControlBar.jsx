import classNames from 'classnames/bind';
import styles from './PlayerControlBar.module.scss';
import { Button } from '~/components';
import PlayerProgress from './PlayerProgress.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faShuffle, faBackwardStep, faForwardStep, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { usePlayerContext } from '~/contexts';
import NowPlayingInfo from './NowPlayingInfo.jsx';
import ChangeVolume from './ChangeVolume.jsx';

const cx = classNames.bind(styles);

function PlayerControlBar() {
    const { playSong, setIsShuffle, pauseSong, isPlaying, isShuffle, nextSong, prevSong, playMode, setPlayMode } =
        usePlayerContext();

    const handleChangePlayMode = () => {
        if (playMode === 'normal') {
            setPlayMode('repeat-all');
        } else if (playMode === 'repeat-all') {
            setPlayMode('repeat-one');
        } else {
            setPlayMode('normal');
        }
    };

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
                        style_2
                        onClick={() => {
                            prevSong();
                        }}
                        leftIcon={<FontAwesomeIcon icon={faBackwardStep} />}
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
                        style_2
                        onClick={() => {
                            nextSong();
                        }}
                        leftIcon={<FontAwesomeIcon icon={faForwardStep} />}
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
