import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MusicPlayer.module.scss';
import { TopBar, PlayerControlBar, RightSlidebarMusicPlayer, SuggestedList, AlbumList } from './components';
import { Section } from '~/components';

import { songsdb } from '../../databseFake/songsdb';
import useSearch from '~/hooks/spotify/useSearch';

const cx = classNames.bind(styles);

const fakeCurrentPlaylist = songsdb.slice(0, 20);

function MusicPlayer() {
    const [currentPlay, setCurrentPlay] = useState(songsdb[0]);
    const [currentPlaylist, setCurrentPlaylist] = useState(fakeCurrentPlaylist);
    const [history, setHistory] = useState([]);
    const { searchApi } = useSearch();

    //test search
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        try {
            const res = await searchApi(query, 'artist', 1);
            setResults(res);
        } catch (err) {
            console.error('Lỗi tìm kiếm:', err);
        }
    };

    useEffect(() => {
        document.title = 'Twirl | Music';
    }, []);

    function handleSetCurrentSong(id) {
        if (currentPlay.id !== id) {
            const result = songsdb.find((song) => song.id === id);
            if (!result) return;
            setCurrentPlay(result);
            setHistory((prev) => {
                const filtered = prev.filter((song) => song.id !== id);
                return [result, ...filtered];
            });
        }
    }

    const trackId = '2h1KRcol4TvqCl1Lf8RWio';

    return (
        <div className={cx('wrapper')}>
            <div style={{ padding: '20px' }}>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Nhập tên bài hát..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={{ padding: '8px', width: '300px' }}
                    />
                    <button type="submit" style={{ padding: '8px' }}>
                        Tìm kiếm
                    </button>
                </form>
            </div>
            <div className={cx('content')}>
                <TopBar data={currentPlaylist} />

                <div className={cx('mt-5')}>
                    <Section title_2="Gợi ý cho bạn">
                        <SuggestedList />
                    </Section>
                </div>
                <div className={cx('mt-5')}>
                    <Section title_2="Giai điệu đón hè">
                        <AlbumList data={currentPlaylist} number={6} col={6} />
                    </Section>
                </div>
                <div className={cx('mt-5')}>
                    <Section title_2="Nhạc hot thịnh hành">
                        <AlbumList data={currentPlaylist} number={6} col={6} />
                    </Section>
                </div>
            </div>
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
