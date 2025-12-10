import classNames from 'classnames/bind';
import styles from './AdminUser.module.scss';
import useGetAllUserInfor from '~/hooks/admin/user/useGetAllUserInfor';
import { ErrorFallback, Loading } from '~/components';

const cx = classNames.bind(styles);

function AdminUser() {
    //get all users from database
    const { users, loading, error } = useGetAllUserInfor();
    console.log(users);
    return (
        <div className={cx('wrapper')}>
            <div id="users" className={cx('content-section')}>
                {loading ? (
                    <Loading />
                ) : error ? (
                    <ErrorFallback />
                ) : (
                    <>
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
                                {users.map((user) => (
                                    <tr>
                                        <td>{`${user.firstName} ${user.lastName}`}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={cx('badge', 'badge-user')}>{user.role}</span>
                                        </td>
                                        <td>
                                            <span className={cx('badge', 'badge-active')}>{user.locked}</span>
                                        </td>
                                        <td>
                                            <button className={cx('btn', 'btn-small')}>Lock</button>
                                            <button className={cx('btn', 'btn-small')}>Change Role</button>
                                            <button className={cx('btn', 'btn-danger', 'btn-small')}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
}

export default AdminUser;
