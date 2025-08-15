import classNames from 'classnames/bind';
import styles from './AdminMusicManage.module.scss';

const cx = classNames.bind(styles);

function AdminMusicManageRow() {
    return (
        <tr>
            <td className={cx('id')}>abc123</td>
            <td className={cx('name')}>Shape of You</td>
            <td className={cx('artist')}>Ed Sheeran</td>
            <td className={cx('type')}>us-uk</td>
            <td>
                <button className={cx('btn-remove')}>Remove</button>
            </td>
        </tr>
    );
}

export default AdminMusicManageRow;
