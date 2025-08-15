import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './RightSlidebarMusicPlayer.module.scss';
import { faClock, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Song } from '../../components';
import { Loading, Section } from '~/components';
import useGetSeveralTracks from '~/hooks/spotify/useGetSeveralTracks';

const cx = classNames.bind(styles);

const RECOMMENDATIONS = [
    '2h1KRcol4TvqCl1Lf8RWio',
    '2iqjXz4lV60gf3tvI4JJzU',
    '6jdOqxknJi9PTw32wd3eJZ',
    '1DVYafsLmcQySKkJnY4RCs',
    '5LrN7yUQAzvthd4QujgPFr',
    '6Q2oEdOhRjZ1DTv2a7j0lN',
    '6h0WS97nJhRZamjYCu7Mwk',
    '2xOhv7XudrBDtkID1jwsFE',
    '1JQSsZjpk61POozXW3L45P',
    '2xijXb00w9o7Ol04MPCL6c',
    '2Fe8U2kJe2qHAenLfegLoV',
    '45PPoUgqs3JrhkZGEzSUHT',
    '2PYDUM2IC01FOTDLQdFxJP',
    '1EmMFSLRVkOszCa4ul9z0F',
    '4yvlgFBlqJ0vjJftbzHZfl',
    '37lhoUU7qjN3gME1KVTXlp',
    '0vXAYEWak7KiyGdbth8Gz6',
];

function RightSlidebarMusicPlayer() {
    const [indexOption, setIndexOption] = useState(0);
    const [tracksList, setTracksList] = useState([]);
    const [historyTracksList, setHistoryTracksList] = useState([]);
    const [currentPlay, setCurrentPlay] = useState();
    const { getSeveralTracks, loading, error } = useGetSeveralTracks();

    useEffect(() => {
        const fetApi = async () => {
            const res = await getSeveralTracks(RECOMMENDATIONS);
            setTracksList(res.data.tracks);
            setCurrentPlay(res.data.tracks[0]);
        };
        fetApi();
    }, []);

    const handleOnclickSong = (songId) => {
        console.log('Song Id: ', songId);
    };

    const handleOnClickArtists = (artistsId) => {
        console.log('Artists Id', artistsId);
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
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
                    {currentPlay ? (
                        <div className={cx('current_play', 'mt-4')}>
                            <Song
                                onClick={handleOnclickSong}
                                onClickArtists={handleOnClickArtists}
                                active
                                data={currentPlay}
                            />
                        </div>
                    ) : (
                        <Loading />
                    )}
                    <hr className={cx('line')} />
                    <div className={cx('playlist_wrapper')}>
                        <Section title={indexOption === 0 ? 'Tiếp theo' : 'Bài hát đã nghe'}>
                            {indexOption === 0
                                ? tracksList.map((track) => (
                                      <Song
                                          onClick={handleOnclickSong}
                                          onClickArtists={handleOnClickArtists}
                                          key={track.id}
                                          data={track}
                                      />
                                  ))
                                : historyTracksList.map((track) => (
                                      <Song
                                          onClick={handleOnclickSong}
                                          onClickArtists={handleOnClickArtists}
                                          key={track.id}
                                          data={track}
                                      />
                                  ))}
                        </Section>
                    </div>
                </div>
            )}
        </>
    );
}

export default RightSlidebarMusicPlayer;
