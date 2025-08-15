import classNames from 'classnames/bind';
import styles from './SuggestedList.module.scss';
import { Song } from '../../components';
import useGetSeveralTracks from '~/hooks/spotify/useGetSeveralTracks';
import { useEffect, useState } from 'react';
import { Loading } from '~/components';

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

function SuggestedList() {
    const [recommendations, setRecommentdations] = useState(RECOMMENDATIONS);
    const [tracksList, setTracksList] = useState([]);
    const { getSeveralTracks, loading, error } = useGetSeveralTracks();

    useEffect(() => {
        const fetApi = async () => {
            const res = await getSeveralTracks(recommendations);
            setTracksList(res.data.tracks);
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
            {loading && tracksList.length == 0 ? (
                <Loading />
            ) : (
                <div className={cx('wrapper', 'row', 'gy-3', 'gx-3')}>
                    {tracksList.slice(0, 9).map((track, index) => (
                        <div key={track.id || index} className="col-4">
                            <Song
                                onClick={handleOnclickSong}
                                onClickArtists={handleOnClickArtists}
                                shadow
                                data={track}
                            />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default SuggestedList;
