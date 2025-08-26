import classNames from 'classnames/bind';
import styles from './AdminMusicManage.module.scss';
import AdminMusicTableContent from './AdminMusicTableContent';
import AdminMusicManageTableHeader from './AdminMusicManageTableHeader';
import { useState } from 'react';

const cx = classNames.bind(styles);

function AdminMusicManageTable({ result, setResult, loading }) {
    const [filterType, setFilterType] = useState('all');
    const [inputValue, setInputValue] = useState('');

    return (
        <div className={cx('table-wrapper')}>
            <div className={cx('result-panel')}>
                <AdminMusicManageTableHeader
                    setFilterType={setFilterType}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                />
                <AdminMusicTableContent
                    inputValue={inputValue}
                    filterType={filterType}
                    result={result}
                    setResult={setResult}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default AdminMusicManageTable;
