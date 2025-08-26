import classNames from 'classnames/bind';
import styles from './SuggestedList.module.scss';
import { Song } from '../../components';
import { Loading } from '~/components';
import useGetTrackRecommend from '~/hooks/music/useGetTrackRecommend';

const cx = classNames.bind(styles);

function SuggestedList() {
    const { tracks, loading, error } = useGetTrackRecommend();

    if (loading || !tracks?.data) {
        return <Loading />;
    }

    const handleOnclickSong = (songId) => {
        console.log('Song Id: ', songId);
    };

    const handleOnClickArtists = (artistsId) => {
        console.log('Artists Id', artistsId);
    };

    return (
        <div className={cx('wrapper', 'row', 'gy-3', 'gx-3')}>
            {tracks.data.slice(0, 9).map((track, index) => (
                <div key={track.id || index} className="col-4">
                    <Song onClick={handleOnclickSong} onClickArtists={handleOnClickArtists} shadow data={track} />
                </div>
            ))}
        </div>
    );
}

export default SuggestedList;
