import classNames from 'classnames/bind';
import styles from './AdminMusicManage.module.scss';
import AdminMusicTableContent from './AdminMusicTableContent';
import AdminMusicManageTableHeader from './AdminMusicManageTableHeader';

const cx = classNames.bind(styles);

function AdminMusicManageTable() {
    return (
        <div className={cx('table-wrapper')}>
            <div className={cx('result-panel')}>
                <AdminMusicManageTableHeader />
                <AdminMusicTableContent />
            </div>
        </div>
    );
}

export default AdminMusicManageTable;
