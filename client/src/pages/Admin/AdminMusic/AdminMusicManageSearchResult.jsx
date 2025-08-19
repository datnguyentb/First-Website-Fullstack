import { use, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './AdminMusicManage.module.scss';
import AdminMusicManageTrackResultItem from './AdminMusicManageTrackResultItem';
import AdminMusicManagePlaylistResultItem from './AdminMusicManagePlaylistResultItem';
import { toast } from 'react-toastify';
import useAddTrackAndPlaylist from '~/hooks/admin/music/useAddTrackAndPlaylist';

const cx = classNames.bind(styles);

function AdminMusicManageSearchResult({ searchResult, setResult, result }) {
    const { addTrackAndPlaylist } = useAddTrackAndPlaylist();

    const data = useMemo(() => {
        const listResult =
            searchResult?.tracks?.items.filter((item) => item !== null) ||
            searchResult?.playlists?.items.filter((item) => item !== null) ||
            [];

        const resultSet = new Set(result.map((item) => item.spotifyId));

        return listResult.map((item) => ({
            ...item,
            isAdded: resultSet.has(item.id),
        }));
    }, [searchResult, result]);

    const handleAddPlaylist = async (id, name, info) => {
        const res = await addTrackAndPlaylist(id, 'playlist', name, info);
        if (res.success) {
            setResult((prev) => [res.data, ...prev]);
            toast.success(res.message);
        } else {
            toast.error(res.message || 'Something went wrong');
        }
    };

    const handleAddTrack = async (id, name, info) => {
        const res = await addTrackAndPlaylist(id, 'track', name, info);
        if (res.success) {
            setResult((prev) => [res.data, ...prev]);
            toast.success(res.message);
        } else {
            toast.error(res.message || 'Something went wrong');
        }
    };

    return (
        <div className={cx('search-result')}>
            {searchResult?.length != 0 && data ? (
                <>
                    {searchResult.playlists &&
                        data.map((item) => (
                            <AdminMusicManagePlaylistResultItem
                                key={item.id}
                                data={item}
                                onAddPlaylist={handleAddPlaylist}
                            />
                        ))}
                    {searchResult.tracks &&
                        data.map((item, index) => (
                            <AdminMusicManageTrackResultItem key={item.id} data={item} onAddTrack={handleAddTrack} />
                        ))}
                </>
            ) : (
                <div className={cx('text-center')}>No data available!</div>
            )}
        </div>
    );
}

export default AdminMusicManageSearchResult;
