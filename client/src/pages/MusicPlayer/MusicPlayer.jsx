import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MusicPlayer.module.scss';
import { PlayerControlBar } from '../../components';
import { RightSlidebarMusicPlayer } from '../../components/Layouts';

import { songsdb } from '../../databseFake/songsdb';

const cx = classNames.bind(styles);

const fakeCurrentPlaylist = songsdb.slice(0, 20);
var i = 1;

function MusicPlayer() {
    const [currentPlay, setCurrentPlay] = useState(songsdb[0]);
    const [currentPlaylist, setCurrentPlaylist] = useState(fakeCurrentPlaylist);
    const [history, setHistory] = useState([]);

    function handleSetCurrentSong(id) {
        if (currentPlay.id !== id) {
            const result = songsdb.find((song) => song.id === id);
            if (!result) return;
            setCurrentPlay(result);
            setHistory((prev) => {
                // Xóa bản cũ nếu có
                const filtered = prev.filter((song) => song.id !== id);
                // Thêm bài hát mới lên đầu
                return [result, ...filtered];
            });
        }
    }

    console.log(i + 1);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>hi</div>
            <div className="right-slidebar">
                <RightSlidebarMusicPlayer
                    onClick={(id) => handleSetCurrentSong(id)}
                    currentPlay={currentPlay}
                    currentPlaylist={currentPlaylist}
                    history={history}
                />
            </div>
            <div className={cx('media-control-bar')}>
                <PlayerControlBar
                    onSongChange={(song) => {
                        setCurrentPlay(song);
                    }}
                    data={currentPlaylist}
                    id={currentPlay.id}
                />
            </div>
        </div>
    );
}

export default MusicPlayer;
