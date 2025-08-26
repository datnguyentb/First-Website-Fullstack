import classNames from 'classnames/bind';
import styles from './AdminMusicManage.module.scss';
import { useEffect, useState } from 'react';
import { useDebounce } from '~/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import useAdminSearchTracks from '~/hooks/admin/music/useAdminSearchTracks';

const cx = classNames.bind(styles);

function AdminMusicManageSearchHeader({ setSearchResult }) {
    const [searchValue, setSearchValue] = useState('');
    const { searchTracks } = useAdminSearchTracks();

    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        const fetSearch = async () => {
            if (debounced) {
                const res = await searchTracks(debounced, 10);
                setSearchResult(res.data);
            } else {
                setSearchResult([]);
            }
        };

        fetSearch();
    }, [debounced]);

    const handleDeleteInput = () => {
        setSearchValue('');
    };
    return (
        <div className={cx('search-header')}>
            <div className={cx('input-box', 'mt-3')}>
                <input
                    type="text"
                    placeholder="Enter name or ID..."
                    autoFocus={true}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                ></input>
                {searchValue && (
                    <div className={cx('delete-icon')} onClick={handleDeleteInput}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminMusicManageSearchHeader;
