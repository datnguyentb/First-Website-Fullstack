import React from 'react';
import classNames from 'classnames/bind';
import styles from './ContextMenu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserCircle,
    faPalette,
    faFaceSmile,
    faPen,
    faUsers,
    faBellSlash,
    faBan,
    faShieldHalved,
    faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    { icon: faShieldHalved, label: 'Được mã hóa đầu cuối', action: 'encrypted', type: 'info' },
    { icon: faArrowUpRightFromSquare, label: 'Mở trong Messenger', action: 'open_app' },
    { icon: faUserCircle, label: 'Xem trang cá nhân', action: 'profile', separator: true },

    { icon: faPalette, label: 'Đổi chủ đề', action: 'theme', color: 'gradient' },
    { icon: faFaceSmile, label: 'Biểu tượng cảm xúc', action: 'emoji', color: 'yellow' },
    { icon: faPen, label: 'Biệt danh', action: 'nickname' },
    { icon: faUsers, label: 'Tạo nhóm', action: 'group', separator: true },

    { icon: faBellSlash, label: 'Tắt thông báo', action: 'mute' },
    { icon: faBan, label: 'Chặn', action: 'block', color: 'red' },
];

function ContextMenu() {
    return (
        <div className={cx('wrapper', 'scrollbar')}>
            <div className={cx('menu-list')}>
                {MENU_ITEMS.map((item, index) => (
                    <div key={index}>
                        <div className={cx('menu-item', item.color)} onClick={() => console.log(item.action)}>
                            <div className={cx('icon-wrapper')}>
                                <FontAwesomeIcon icon={item.icon} />
                            </div>
                            <span className={cx('label')}>{item.label}</span>
                        </div>
                        {item.separator && <div className={cx('separator')} />}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ContextMenu;
