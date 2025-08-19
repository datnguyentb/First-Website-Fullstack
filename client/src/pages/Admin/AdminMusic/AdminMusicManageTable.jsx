import classNames from 'classnames/bind';
import styles from './AdminMusicManage.module.scss';
import AdminMusicTableContent from './AdminMusicTableContent';
import AdminMusicManageTableHeader from './AdminMusicManageTableHeader';
import { useState } from 'react';

const cx = classNames.bind(styles);

function AdminMusicManageTable({ result, setResult, loading }) {
    const [type, setType] = useState('all');
    const [inputValue, setInputValue] = useState('');

    return (
        <div className={cx('table-wrapper')}>
            <div className={cx('result-panel')}>
                <AdminMusicManageTableHeader setType={setType} inputValue={inputValue} setInputValue={setInputValue} />
                <AdminMusicTableContent
                    inputValue={inputValue}
                    type={type}
                    result={result}
                    setResult={setResult}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default AdminMusicManageTable;
