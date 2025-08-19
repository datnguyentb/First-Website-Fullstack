import classNames from 'classnames/bind';
import styles from './AdminMusicManage.module.scss';
import AdminMusicManageSearch from './AdminMusicManageSearch';
import AdminMusicManageTable from './AdminMusicManageTable';
import { useAdminMusicManage } from './useAdminMusicManage';

const cx = classNames.bind(styles);

function AdminMusicManage() {
    const { result, setResult, loading } = useAdminMusicManage();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left-search')}>
                <AdminMusicManageSearch result={result} setResult={setResult} />
            </div>
            <div className={cx('right-table')}>
                <AdminMusicManageTable result={result} setResult={setResult} loading={loading} />
            </div>
        </div>
    );
}

export default AdminMusicManage;
