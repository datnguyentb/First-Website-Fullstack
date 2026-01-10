import classNames from 'classnames/bind';
import styles from './HomeView.module.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function HomeView({ setCreateRoomOpen }: { setCreateRoomOpen: (open: boolean) => void }) {
    const [userName, setUserName] = useState('Khách 123');

    return (
        <div className={cx('wrapper')}>
            <div className={cx('home-view')}>
                <div className={cx('container')}>
                    <div className={cx('header')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faCompactDisc} />
                        </div>
                        <h1>Co-Listen</h1>
                        <p>Tạo phòng riêng, tham gia bằng ID, hoặc duyệt các phòng công khai đang chờ.</p>
                    </div>
                    <div className={cx('body')}>
                        <div className={cx('create-room')}>
                            <input
                                className={cx('user-name')}
                                type="text"
                                placeholder="Nhập Tên Người Dùng của bạn"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <button className={cx('create-room-btn')} onClick={() => setCreateRoomOpen(true)}>
                                Tạo Phòng mới
                            </button>
                            <button className={cx('browse-room-btn')}>Duyệt Phòng Công Khai</button>
                            <div className={cx('join-with-id')}>
                                <input type="text" placeholder="HOẶC: NHẬP ID PHÒNG..." />
                                <button className={cx('join-room-btn')}>Vào</button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('footer')}>
                        <p className={cx('sub')}>Bạn đã rời phòng.</p>
                        <p className={cx('copy')}>© 2023 Co-Listening. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeView;
