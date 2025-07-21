import classNames from 'classnames/bind';
import styles from './AdminUser.module.scss';

const cx = classNames.bind(styles);

function AdminUser() {
    return (
        <div className={cx('wrapper')}>
            <div id="users" className={cx('content-section')}>
                <h2 className={cx('header')}>Danh sách người dùng</h2>
                <table>
                    <thead>
                        <tr>
                            <th className={cx('title')}>Tên</th>
                            <th className={cx('title')}>Email</th>
                            <th className={cx('title')}>Vai trò</th>
                            <th className={cx('title')}>Trạng thái</th>
                            <th className={cx('title')}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nguyễn Văn A</td>
                            <td>a@example.com</td>
                            <td>
                                <span className={cx('badge', 'badge-user')}>User</span>
                            </td>
                            <td>
                                <span className={cx('badge', 'badge-active')}>Hoạt động</span>
                            </td>
                            <td>
                                <button className={cx('btn', 'btn-small')}>Khóa</button>
                                <button className={cx('btn', 'btn-small')}>Đổi vai trò</button>
                                <button className={cx('btn', 'btn-danger', 'btn-small')}>Xóa</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Trần Thị B</td>
                            <td>b@example.com</td>
                            <td>
                                <span className={cx('badge', 'badge-admin')}>Admin</span>
                            </td>
                            <td>
                                <span className={cx('badge', 'badge-locked')}>Đã khóa</span>
                            </td>
                            <td>
                                <button className={cx('btn', 'btn-success', 'btn-small')}>Mở khóa</button>
                                <button className={cx('btn', 'btn-small')}>Đổi vai trò</button>
                                <button className={cx('btn', 'btn-danger', 'btn-small')}>Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminUser;
