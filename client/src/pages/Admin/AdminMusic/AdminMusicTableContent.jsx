import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './AdminMusicManage.module.scss';
import AdminMusicManageRow from './AdminMusicManageRow';
import { useMemo } from 'react';
import { Loading } from '~/components';
import { toast } from 'react-toastify';
import useAdminDeleteTrack from '~/hooks/admin/music/useAdminDeleteTrack';

const cx = classNames.bind(styles);

function AdminMusicTableContent({ inputValue, result, setResult, loading, filterType }) {
    const { deleteTrack } = useAdminDeleteTrack();

    const filteredData = useMemo(() => {
        if (!result) return [];

        let data =
            filterType === 'ready'
                ? result.filter((item) => item.isReady === true)
                : filterType === 'not_ready'
                  ? result.filter((item) => item.isReady === false)
                  : result;

        if (inputValue.trim() !== '') {
            const lowerInput = inputValue.toLowerCase();
            data = data.filter((item) => item.name.toLowerCase().includes(lowerInput));
        }

        return data;
    }, [result, filterType, inputValue]);

    const handleRemove = async (id) => {
        const res = await deleteTrack(id);
        if (res.success) {
            setResult((prev) => prev.filter((item) => item._id !== id));
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
                                <th>Artists</th>
                                <th>Status</th>
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

AdminMusicTableContent.propTypes = {
    inputValue: PropTypes.string,
    result: PropTypes.array,
    setResult: PropTypes.func,
    loading: PropTypes.bool,
    filterType: PropTypes.string,
};

export default AdminMusicTableContent;
