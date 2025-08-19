import classNames from 'classnames/bind';
import styles from './AdminMusicManage.module.scss';
import { useEffect, useState } from 'react';
import useAdminSearch from '~/hooks/admin/music/useAdminSearch';
import { useDebounce } from '~/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AdminMusicManageSearchHeader({ setSearchResult }) {
    const [searchType, setSearchType] = useState('track');
    const [searchValue, setSearchValue] = useState('');
    const { searchApi, loading, error } = useAdminSearch();

    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        const fetSearch = async () => {
            if (debounced && searchType) {
                const res = await searchApi(debounced, searchType);
                setSearchResult(res.data);
            } else {
                setSearchResult([]);
            }
        };

        fetSearch();
    }, [searchType, debounced]);

    const handleDeleteInput = () => {
        setSearchValue('');
    };
    return (
        <div className={cx('search-header')}>
            <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option value="track">Track</option>
                <option value="playlist">Playlist</option>
            </select>
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
