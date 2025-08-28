// PlayerContext.js
import { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import baseUrl from '~/helper/baseUrl';
import useAddTrackToListeningHistory from '~/hooks/music/useAddTrackToListeningHistory';
import useGetListeningHistory from '~/hooks/music/useGetListeningHistory';
import useGetTrackUrl from '~/hooks/music/useGetTrackUrl';
import { shuffleArray } from '~/utils/shuffleArray';
import { userAuthContext } from '.';

export const PlayerContext = createContext();

export function PlayerProvider({ children }) {
    const audioRef = useRef(new Audio());
    const { getListeningHistory } = useGetListeningHistory();
    const { addTrackToListeningHistory } = useAddTrackToListeningHistory();
    const [currentSong, setCurrentSong] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [playlist, setPlaylist] = useState([]);
    const [queue, setQueue] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [playMode, setPlayMode] = useState('normal');
    const [isShuffle, setIsShuffle] = useState(false);
    const { getTrackUrl } = useGetTrackUrl();
    const { auth } = userAuthContext();

    // ref để giữ nextSong mới nhất
    const nextSongRef = useRef(null);

    useEffect(() => {
        if (!auth || !auth.token || auth.role !== 'user') return;

        const fetchHistory = async () => {
            try {
                const historyList = await getListeningHistory();
                if (Array.isArray(historyList) && historyList.length > 0) {
                    setPlaylist(historyList);
                    setCurrentSong(historyList[0]);
                    setQueue(historyList);
                }
            } catch (err) {
                console.error('Lỗi khi fetch history:', err);
            }
        };

        fetchHistory();
    }, [auth]);

    // Cập nhật queue khi isShuffle thay đổi
    useEffect(() => {
        if (playlist.length === 0 || !currentSong) return;

        if (isShuffle === true) {
            const shuffled = shuffleArray(playlist);
            const newIndex = shuffled.findIndex((s) => s.id === currentSong.id);
            setQueue(shuffled);
            setCurrentIndex(newIndex);
        } else {
            const newIndex = playlist.findIndex((s) => s.id === currentSong.id);
            setQueue([...playlist]);
            setCurrentIndex(newIndex);
        }
    }, [isShuffle, playlist]);

    // Phát nhạc
    const playSong = useCallback(
        async (song) => {
            if (!song && !currentSong) return;
            if (!song) song = queue[currentIndex];

            const songUrl = await getTrackUrl(song._id);
            const url = baseUrl(songUrl);

            if (audioRef.current.src !== url) {
                audioRef.current.src = url;
            }
            audioRef.current.play().catch((err) => {
                console.warn('Autoplay failed:', err);
            });
            addTrackToListeningHistory(song._id);

            setIsPlaying(true);
            setCurrentSong(song);
        },
        [currentSong, currentIndex, queue, getTrackUrl, addTrackToListeningHistory],
    );

    const pauseSong = useCallback(() => {
        audioRef.current.pause();
        setIsPlaying(false);
    }, []);

    const seek = (time) => {
        audioRef.current.currentTime = time;
    };

    const nextSong = useCallback(() => {
        if (queue.length === 0) return;

        if (playMode === 'normal' && currentIndex === queue.length - 1) {
            pauseSong();
            return;
        } else if (playMode === 'repeat-all' && currentIndex === queue.length - 1) {
            setCurrentIndex(0);
            playSong(queue[0]);
            return;
        } else if (playMode === 'repeat-one') {
            playSong(queue[currentIndex]);
            return;
        }

        const nextIndex = (currentIndex + 1) % queue.length;
        setCurrentIndex(nextIndex);
        playSong(queue[nextIndex]);
    }, [queue, currentIndex, playMode, playSong, pauseSong]);

    const prevSong = useCallback(() => {
        if (queue.length === 0) return;
        const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
        setCurrentIndex(prevIndex);
        playSong(queue[prevIndex]);
    }, [queue, currentIndex, playSong]);

    // luôn update ref với nextSong mới nhất
    useEffect(() => {
        nextSongRef.current = nextSong;
    }, [nextSong]);

    // Gắn listener cho audio (chỉ tạo 1 lần)
    useEffect(() => {
        const audio = audioRef.current;
        const handleEnded = () => {
            setIsPlaying(false);
            audio.currentTime = 0;
            if (nextSongRef.current) nextSongRef.current();
        };
        audio.addEventListener('ended', handleEnded);
        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    return (
        <PlayerContext.Provider
            value={{
                currentSong,
                isPlaying,
                playSong,
                pauseSong,
                seek,
                nextSong,
                prevSong,
                playMode,
                setPlayMode,
                setPlaylist,
                isShuffle,
                setIsShuffle,
                audioRef,
                volume,
                setVolume,
            }}
        >
            {children}
            <audio ref={audioRef} />
        </PlayerContext.Provider>
    );
}

export const usePlayer = () => useContext(PlayerContext);
