import classNames from 'classnames/bind';
import styles from './AdminMusicManage.module.scss';

const cx = classNames.bind(styles);

function AdminMusicManageTableHeader() {
    return (
        <div className={cx('table-header-wrapper')}>
            <input type="text" placeholder="Enter you search" />
            <div>
                <label>Type</label>
                <select>
                    <option value="all" defaultChecked>
                        All
                    </option>
                    <option value="track">Track</option>
                    <option value="playlist">Playlist</option>
                </select>
            </div>
        </div>
    );
}

export default AdminMusicManageTableHeader;
