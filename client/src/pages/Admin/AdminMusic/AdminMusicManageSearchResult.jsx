import classNames from 'classnames/bind';
import styles from './AdminMusicManage.module.scss';
import AdminMusicManageTrackResultItem from './AdminMusicManageTrackResultItem';
import AdminMusicManagePlaylistResultItem from './AdminMusicManagePlaylistResultItem';
import { Img } from '~/components';

const cx = classNames.bind(styles);

function AdminMusicManageSearchResult({ searchResult }) {
    let data;
    if (searchResult?.tracks) {
        data = searchResult.tracks.items.filter((item) => item !== null);
    } else if (searchResult?.playlists) {
        data = searchResult.playlists.items.filter((item) => item !== null);
    }

    return (
        <div className={cx('search-result')}>
            {searchResult.length != 0 && data ? (
                <>
                    {searchResult.playlists &&
                        data.map((item) => <AdminMusicManagePlaylistResultItem key={item.id} data={item} />)}
                    {searchResult.tracks &&
                        data.map((item, index) => <AdminMusicManageTrackResultItem key={item.id} data={item} />)}
                </>
            ) : (
                <div className={cx('text-center')}>No data available!</div>
            )}
        </div>
    );
}

export default AdminMusicManageSearchResult;
