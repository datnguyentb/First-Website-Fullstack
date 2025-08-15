import classNames from 'classnames/bind';
import styles from './AdminMusicManage.module.scss';
import AdminMusicManageSearchHeader from './AdminMusicManageSearchHeader';
import AdminMusicManageSearchResult from './AdminMusicManageSearchResult';
import { useState } from 'react';

const cx = classNames.bind(styles);

function AdminMusicManageSearch() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchType, setSearchType] = useState('track');
    return (
        <div className={cx('search-wrapper')}>
            <AdminMusicManageSearchHeader setSearchResult={setSearchResult} />
            <AdminMusicManageSearchResult searchResult={searchResult} />
        </div>
    );
}

export default AdminMusicManageSearch;
