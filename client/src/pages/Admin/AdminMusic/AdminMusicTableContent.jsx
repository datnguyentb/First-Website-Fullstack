import classNames from 'classnames/bind';
import styles from './AdminMusicManage.module.scss';
import AdminMusicManageRow from './AdminMusicManageRow';
import { useMemo } from 'react';
import { Loading } from '~/components';
import useDeleteTrackAndPlaylist from '~/hooks/admin/music/useDeleteTrackAndPlaylist';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function AdminMusicTableContent({ inputValue, result, setResult, loading, type }) {
    const { deleteTrackAndPlaylist } = useDeleteTrackAndPlaylist();

    const filteredData = useMemo(() => {
        if (!result) return [];

        let data = type === 'all' ? result : result.filter((item) => item.type === type);

        if (inputValue.trim() !== '') {
            const lowerInput = inputValue.toLowerCase();
            data = data.filter((item) => item.name.toLowerCase().includes(lowerInput));
        }

        return data;
    }, [result, type, inputValue]);

    const handleRemove = async (id) => {
        const res = await deleteTrackAndPlaylist(id);
        if (res.success) {
            setResult((prev) => prev.filter((item) => item.spotifyId !== id));
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    };
    return (
        <>
            {loading || !result ? (
                <Loading />
            ) : (
                <div className={cx('table-cover')}>
                    <table>
                        <thead>
                            <tr className={cx('table-header')}>
                                <th>Title</th>
                                <th>Info</th>
                                <th>Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredData.map((item, index) => (
                                <AdminMusicManageRow onDelete={handleRemove} key={index} data={item} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default AdminMusicTableContent;
