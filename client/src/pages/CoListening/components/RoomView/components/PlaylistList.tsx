import classNames from 'classnames/bind';
import styles from '../RoomView.module.scss';

const cx = classNames.bind(styles);

const PLAYLIST_LIST_TEST = [
    //20 bài hát mẫu
    { id: 1, name: 'Cơn Mưa Ngang Qua', singer: 'Sơn Tùng M-TP', status: 'active' },
    { id: 2, name: 'Hãy Trao Cho Anh', singer: 'Sơn Tùng M-TP', status: 'waiting' },
    { id: 3, name: 'Chạy Ngay Đi', singer: 'Sơn Tùng M-TP', status: 'waiting' },
    { id: 4, name: 'Lạc Trôi', singer: 'Sơn Tùng M-TP', status: 'waiting' },
    { id: 5, name: 'Nơi Này Có Anh', singer: 'Sơn Tùng M-TP', status: 'waiting' },
    { id: 6, name: 'Em Của Ngày Hôm Qua', singer: 'Sơn Tùng M-TP', status: 'waiting' },
    { id: 7, name: 'Chúng Ta Không Thuộc Về Nhau', singer: 'Sơn Tùng M-TP', status: 'waiting' },
    { id: 8, name: 'Có Chắc Yêu Là Đây', singer: 'Sơn Tùng M-TP', status: 'waiting' },
    { id: 9, name: 'Âm Thầm Bên Em', singer: 'Sơn Tùng M-TP', status: 'waiting' },
    { id: 10, name: 'Buông Đôi Tay Nhau Ra', singer: 'Sơn Tùng M-TP', status: 'waiting' },
    { id: 11, name: 'Nắng Ấm Xa Dần', singer: 'Sơn Tùng M-TP', status: 'waiting' },
    { id: 12, name: 'Chắc Ai Đó Sẽ Về', singer: 'Sơn Tùng M-TP', status: 'waiting' },
    { id: 13, name: 'Tình Yêu Diệu Kỳ', singer: 'Sơn Tùng M-TP', status: 'waiting' },
    { id: 14, name: 'Chạy Ngay Đi', singer: 'Sơn Tùng M-TP', status: 'waiting' },
    { id: 15, name: 'Lạc Trôi', singer: 'Sơn Tùng M-TP', status: 'waiting' },
    { id: 16, name: 'Nơi Này Có Anh', singer: 'Sơn Tùng M-TP', status: 'waiting' },
    { id: 17, name: 'Em Của Ngày Hôm Qua', singer: 'Sơn Tùng M-TP', status: 'waiting' },
    { id: 18, name: 'Chúng Ta Không Thuộc Về Nhau', singer: 'Sơn Tùng M-TP', status: 'waiting' },
    { id: 19, name: 'Có Chắc Yêu Là Đây', singer: 'Sơn Tùng M-TP', status: 'waiting' },
    { id: 20, name: 'Âm Thầm Bên Em', singer: 'Sơn Tùng M-TP', status: 'waiting' },
];

function PlaylistList() {
    return (
        <div className={cx('playlist-list', 'scrollbar')}>
            <h2 className={cx('playlist-title')}>Playlist Chia Sẻ:</h2>
            <ul className={cx('playlist-items')}>
                {PLAYLIST_LIST_TEST.map((item) => (
                    <li key={item.id} className={cx('playlist-item', { active: item.status === 'active' })}>
                        <div className={cx('playlist-item-info')}>
                            <span className={cx('playlist-item-name')}>{item.name}</span>
                            <span className={cx('playlist-item-singer')}>{item.singer}</span>
                        </div>
                        {item.status === 'active' ? (
                            <span className={cx('playlist-item-status')}>Đang phát</span>
                        ) : (
                            <span className={cx('playlist-item-status')}>Xóa</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PlaylistList;
