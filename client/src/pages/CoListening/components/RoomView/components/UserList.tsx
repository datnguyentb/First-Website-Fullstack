import classNames from 'classnames/bind';
import styles from '../RoomView.module.scss';
import { Img } from '~/components';

const cx = classNames.bind(styles);

const USER_LIST_TEST = [
    {
        id: 1,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
        name: 'Tùng',
        status: 'online',
        isMe: true,
    },
    { id: 2, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka', name: 'Châu', status: 'online' },
    { id: 3, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=George', name: 'Quang', status: 'away' },
    { id: 4, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Heidi', name: 'Thảo', status: 'offline' },
    { id: 5, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jude', name: 'Kiệt', status: 'online' },
    { id: 6, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kim', name: 'Linh', status: 'busy' },
    { id: 7, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Liam', name: 'Long', status: 'online' },
    { id: 8, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mimi', name: 'Trang', status: 'away' },
    { id: 9, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nala', name: 'Phước', status: 'offline' },
    { id: 10, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Owen', name: 'Nam', status: 'online' },
];

function UserList() {
    return (
        <div className={cx('user-list')}>
            <h2 className={cx('user-list-title')}>Khán Phòng (7/10)</h2>
            <ul className={cx('user-list-items')}>
                {USER_LIST_TEST.map((user) => (
                    <li key={user.id} className={cx('user-list-item')}>
                        <div className={cx('seat-pod', { me: user.isMe })}>
                            <div className={cx('avatar')}>
                                <Img src={user.avatar} />
                            </div>
                            <span className={cx('name')}>{user.isMe ? 'You' : user.name}</span>
                        </div>
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
