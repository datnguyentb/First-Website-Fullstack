import classNames from 'classnames/bind';
import styles from './RoomView.module.scss';
import { Search, Header, MusicPlayer, PlaylistList, UserList, ChatRoom } from './components';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function RoomView() {
    useEffect(() => {
        // Thêm logic để lấy dữ liệu phòng từ server nếu cần thiết
    }, []);
    return (
        <div className={cx('room-view')}>
            <div className={cx('wrapper')}>
                <div className={cx('left-content')}>
                    <Header />
                    <MusicPlayer />
                    <Search />
                    <PlaylistList />
                </div>
                <div className={cx('right-content')}>
                    <UserList />
                    <ChatRoom />
                </div>
            </div>
        </div>
    );
}

export default RoomView;
