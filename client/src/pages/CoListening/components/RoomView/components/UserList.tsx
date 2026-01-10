import classNames from 'classnames/bind';
import styles from '../RoomView.module.scss';

const cx = classNames.bind(styles);

const USER_LIST_TEST = [
    //20 user mẫu
    { id: 1, name: 'Nguyễn Văn A', status: 'online', isMe: true },
    { id: 2, name: 'Trần Thị B', status: 'offline' },
    { id: 3, name: 'Lê Văn C', status: 'online' },
    { id: 4, name: 'Phạm Thị D', status: 'offline' },
    { id: 5, name: 'Hoàng Văn E', status: 'online' },
    { id: 6, name: 'Vũ Thị F', status: 'offline' },
    { id: 7, name: 'Đặng Văn G', status: 'online' },
];

function UserList() {
    return (
        <div className={cx('user-list')}>
            <h2 className={cx('user-list-title')}>KHÁN PHÒNG (7/10)</h2>
            <ul className={cx('user-list-items')}>
                {USER_LIST_TEST.map((user) => (
                    <li
                        key={user.id}
                        className={cx('user-list-item', { online: user.status === 'online' }, { me: user.isMe })}
                    >
                        <span className={cx('user-list-item-name')}>{user.name}</span>
                        {user.isMe ? <span className={cx('user-list-item-me')}> (Bạn)</span> : null}
                    </li>
                ))}
            </ul>
            <div className={cx('user-list-footer')}>
                <p className={cx('user-list-footer-id')}>
                    ID phòng: <span>KPOP99</span>
                </p>
            </div>
        </div>
    );
}

export default UserList;
