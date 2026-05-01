import classNames from 'classnames/bind';
import styles from './FriendsListWindow.module.scss';
import Img from '~/components/Img';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const fakeUsers = [
    {
        _id: 'u1',
        fullName: 'Minh Nguyễn',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400',
        status: 'online',
        lastMessage: 'Đi cà phê không bro?',
        lastOnline: '2025-10-26T11:00:00Z',
    },
    {
        _id: 'u2',
        fullName: 'Lan Phạm',
        avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400',
        status: 'offline',
        lastMessage: 'Ngủ sớm đi nha 😴',
        lastOnline: '2025-10-25T22:30:00Z',
    },
    {
        _id: 'u3',
        fullName: 'Tuấn Anh',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400',
        status: 'online',
        lastMessage: 'Tối code tiếp không?',
        lastOnline: '2025-10-26T09:45:00Z',
    },
    {
        _id: 'u4',
        fullName: 'Khánh Vy',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400',
        status: 'away',
        lastMessage: 'Đang học React đây 🧠',
        lastOnline: '2025-10-26T08:12:00Z',
    },
    {
        _id: 'u5',
        fullName: 'Đạt Lê',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400',
        status: 'online',
        lastMessage: 'Fix xong bug chưa?',
        lastOnline: '2025-10-26T10:50:00Z',
    },
    {
        _id: 'u6',
        fullName: 'Tuấn Anh',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400',
        status: 'online',
        lastMessage: 'Tối code tiếp không?',
        lastOnline: '2025-10-26T09:45:00Z',
    },
    {
        _id: 'u7',
        fullName: 'Khánh Vy',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400',
        status: 'away',
        lastMessage: 'Đang học React đây 🧠',
        lastOnline: '2025-10-26T08:12:00Z',
    },
    {
        _id: 'u8',
        fullName: 'Đạt Lê',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400',
        status: 'online',
        lastMessage: 'Fix xong bug chưa?',
        lastOnline: '2025-10-26T10:50:00Z',
    },
];

const cx = classNames.bind(styles);

function FriendsListWindow({ setIsShowFriendsList }) {
    return (
        <div className={cx('friends-list-window')}>
            <div className={cx('friends-list-header')}>
                <h3>Friends</h3>
                <button className={cx('close-btn', 'chat-action-btn')} onClick={() => setIsShowFriendsList(false)}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
            </div>
            <div className={cx('search-bar')}>
                <input type="text" placeholder="Search friends..." autoFocus={true} />
            </div>
            <div className={cx('friends-list', 'scrollbar')}>
                {fakeUsers.map((user) => (
                    <div key={user._id} className={cx('friend-item')}>
                        <div className={cx('user-avatar')}>
                            <Img circle src={user.avatar} />
                            {user.status === 'online' && <div className={cx('online-indicator')}></div>}
                        </div>
                        <div className={cx('friend-name')}>{user.fullName}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FriendsListWindow;
