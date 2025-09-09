import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './RightSlidebarMusicPlayer.module.scss';
import { faClock, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Section, Song } from '~/components';
import { usePlayerContext } from '~/contexts';
import useGetListeningHistory from '~/hooks/music/history/useGetListeningHistory';
import { set } from 'date-fns';

const cx = classNames.bind(styles);

function RightSlidebarMusicPlayer() {
    const { currentSong, isplaying, queue, currentIndex } = usePlayerContext();
    const { getListeningHistory } = useGetListeningHistory();
    const [indexOption, setIndexOption] = useState(0);
    const [tracksList, setTracksList] = useState([]);
    const [historyTracksList, setHistoryTracksList] = useState([]);

    const handleOnclickSong = (songId) => {
        console.log('Song Id: ', songId);
    };

    const handleOnClickArtists = (artistsId) => {
        console.log('Artists Id', artistsId);
    };

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const historyList = await getListeningHistory();
                if (Array.isArray(historyList) && historyList.length > 0) {
                    setHistoryTracksList(historyList);
                }
            } catch (err) {
                console.error('Lỗi khi fetch history:', err);
            }
        };
        fetchHistory();
    }, []);

    useEffect(() => {
        if (queue && queue.length > 0) {
            setTracksList(queue.slice(currentIndex + 1));
        } else {
            setTracksList([]);
        }
    }, [queue, currentIndex]);

    return (
        <>
            <div className={cx('wrapper', 'd-flex')}>
                <div className={cx('option-bar', 'd-flex')}>
                    <div className={cx('tab-group', 'd-flex')}>
                        <button
                            onClick={() => {
                                setIndexOption(0);
                            }}
                            className={cx('tab', indexOption === 0 && 'tab-active')}
                        >
                            Danh sách phát
                        </button>
                        <button
                            onClick={() => setIndexOption(1)}
                            className={cx('tab', indexOption === 1 && 'tab-active')}
                        >
                            Nghe gần đây
                        </button>
                    </div>

                    <button className={cx('icon-btn')}>
                        <FontAwesomeIcon icon={faClock} />
                    </button>

                    <button className={cx('icon-btn')}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </button>
                </div>
                {currentSong && (
                    <div className={cx('current_play', 'mt-4')}>
                        <Song onClick={handleOnclickSong} isplaying={isplaying} active data={currentSong} />
                    </div>
                )}
                <hr className={cx('line')} />
                <div className={cx('playlist_wrapper')}>
                    <Section title={indexOption === 0 ? 'Tiếp theo' : 'Bài hát đã nghe'}>
                        {indexOption === 0
                            ? tracksList.map((track) => (
                                  <Song onClick={handleOnclickSong} key={track._id} data={track} />
                              ))
                            : historyTracksList.map((track) => (
                                  <Song onClick={handleOnclickSong} key={track._id} data={track} />
                              ))}
                    </Section>
                </div>
            </div>
        </>
    );
}

export default RightSlidebarMusicPlayer;
