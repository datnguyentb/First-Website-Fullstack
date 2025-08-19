import classNames from 'classnames/bind';
import styles from './AdminMusicManage.module.scss';
import AdminMusicManageSearchHeader from './AdminMusicManageSearchHeader';
import AdminMusicManageSearchResult from './AdminMusicManageSearchResult';
import { useState } from 'react';

const cx = classNames.bind(styles);

function AdminMusicManageSearch({ result, setResult }) {
    const [searchResult, setSearchResult] = useState([]);
    return (
        <div className={cx('search-wrapper')}>
            <AdminMusicManageSearchHeader setSearchResult={setSearchResult} />
            <AdminMusicManageSearchResult result={result} searchResult={searchResult} setResult={setResult} />
        </div>
    );
}

export default AdminMusicManageSearch;
