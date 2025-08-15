import classNames from 'classnames/bind';
import styles from './AdminMusicManage.module.scss';
import AdminMusicManageSearch from './AdminMusicManageSearch';
import AdminMusicManageTable from './AdminMusicManageTable';

const cx = classNames.bind(styles);

function AdminMusicManage() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left-search')}>
                <AdminMusicManageSearch />
            </div>
            <div className={cx('right-table')}>
                <AdminMusicManageTable />
            </div>
        </div>
    );
}

export default AdminMusicManage;
