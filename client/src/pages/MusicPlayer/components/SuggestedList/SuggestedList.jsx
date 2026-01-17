import classNames from 'classnames/bind';
import styles from './SuggestedList.module.scss';
import { Loading, Song } from '~/components';
import useGetTrackRecommend from '~/hooks/music/tracks/useGetTrackRecommend';

const cx = classNames.bind(styles);

function SuggestedList() {
    const { tracks, loading } = useGetTrackRecommend();

    if (loading || !tracks) {
        return <Loading type="wave-2" />;
    }

    return (
        <div className={cx('wrapper', 'row', 'gy-3', 'gx-3')}>
            {tracks.slice(0, 9).map((track, index) => (
                <div key={track._id || index} className="col-4">
                    <Song shadow data={track} />
                </div>
            ))}
        </div>
    );
}

export default SuggestedList;
