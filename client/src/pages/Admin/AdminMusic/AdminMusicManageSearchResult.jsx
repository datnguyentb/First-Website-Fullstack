import { use, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './AdminMusicManage.module.scss';
import AdminMusicManageTrackResultItem from './AdminMusicManageTrackResultItem';
import { toast } from 'react-toastify';
import useAddTrack from '~/hooks/admin/music/useAddTrack';

const cx = classNames.bind(styles);

function AdminMusicManageSearchResult({ searchResult, setResult, result }) {
    const { addTrack } = useAddTrack();

    const data = useMemo(() => {
        const listResult = searchResult?.tracks?.items.filter((item) => item !== null) || [];

        const resultSet = new Set(result?.map((item) => item.spotifyId));

        return listResult.map((item) => ({
            ...item,
            isAdded: resultSet.has(item.id),
        }));
    }, [searchResult, result]);

    const handleAddTrack = async (id, name, info) => {
        const res = await addTrack(id);
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
