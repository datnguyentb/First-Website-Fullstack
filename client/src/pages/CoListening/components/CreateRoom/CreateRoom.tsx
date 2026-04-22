import classNames from 'classnames/bind';
import styles from './CreateRoom.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function CreateRoom({ setCreateRoomOpen }: { setCreateRoomOpen: (open: boolean) => void }) {
    const [roomName, setRoomName] = useState('');
    const [password, setPassword] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Tạo Phòng Mới</h2>
            <input
                className={cx('input', 'room-name')}
                type="text"
                placeholder="Tên phòng (Tùy chọn)"
                value={roomName}
                autoComplete="off"
                onChange={(e) => setRoomName(e.target.value)}
            />
            <div className={cx('create-password')}>
                <label className={cx('label')}>Đặt Mật Khẩu (Phòng Riêng)</label>
                <input
                    className={cx('checkbox')}
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                />
            </div>
            {isPrivate && (
                <input
                    className={cx('input')}
                    type="password"
                    autoComplete="new-password"
                    placeholder="Mật khẩu (Tùy chọn)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            )}
            <div className={cx('action-btn')}>
                <button className={cx('btn', 'cancel')} onClick={() => setCreateRoomOpen(false)}>
                    Hủy
                </button>
                <Link to={`/co-listening/room/${roomName}`} className={cx('btn', 'create')}>
                    Tạo Phòng
                </Link>
            </div>
        </div>
    );
}

export default CreateRoom;
