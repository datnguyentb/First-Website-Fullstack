import classNames from 'classnames/bind';
import styles from './ChatWidgetWindow.module.scss';
import Img from '~/components/Img';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';
import baseUrl from '~/helper/baseUrl';
import { ChatWidgetWindowHeaderProps } from '../ChatWidgetTypes';
import React, { useState } from 'react';
import TippyMenu from '~/components/TippyMenu/TippyMenu';
import ActionMenu from '~/components/ActionMenu';
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
    {
        icon: <FontAwesomeIcon icon={faShieldHalved} />,
        label: 'Được mã hóa đầu cuối',
        action: 'encrypted',
        type: 'info',
        children: [
            {
                label: 'Tìm hiểu thêm',
                action: 'learn_more',
                handleClick: () => {
                    console.log('Learn more clicked');
                },
            },
            { label: 'Xem chứng nhận', action: 'view_certificate', to: '/todo' },
            {
                label: 'Báo cáo sự cố bảo mật',
                action: 'report_security_issue',
                href: 'https://www.messenger.com/help/report',
            },
            {
                label: 'Báo cáo sự cố bảo mật',
                action: 'report_security_issue',
                href: 'https://www.messenger.com/help/report',
            },
            {
                label: 'Báo cáo sự cố bảo mật',
                action: 'report_security_issue',
                href: 'https://www.messenger.com/help/report',
            },
            {
                label: 'Báo cáo sự cố bảo mật',
                action: 'report_security_issue',
                href: 'https://www.messenger.com/help/report',
            },
            {
                label: 'Báo cáo sự cố bảo mật',
                action: 'report_security_issue',

                href: 'https://www.messenger.com/help/report',
            },
            {
                label: 'Báo cáo sự cố bảo mật',
                action: 'report_security_issue',
                href: 'https://www.messenger.com/help/report',
            },
            {
                label: 'Báo cáo sự cố bảo mật',
                action: 'report_security_issue',
                href: 'https://www.messenger.com/help/report',
            },
            {
                label: 'Báo cáo sự cố bảo mật',
                action: 'report_security_issue',
                href: 'https://www.messenger.com/help/report',
            },
        ],
    },
    {
        icon: <FontAwesomeIcon icon={faArrowUpRightFromSquare} />,
        label: 'Mở trong Messenger',
        to: '/messenger',
        action: 'open_app',
    },
    {
        icon: <FontAwesomeIcon icon={faUserCircle} />,
        label: 'Xem trang cá nhân',
        to: '/profile',
        action: 'profile',
        separator: true,
    },

    {
        icon: <FontAwesomeIcon icon={faPalette} />,
        label: 'Đổi chủ đề',
        action: 'theme',
    },
    { icon: <FontAwesomeIcon icon={faFaceSmile} />, label: 'Biểu tượng cảm xúc', action: 'emoji', color: 'yellow' },
    { icon: <FontAwesomeIcon icon={faPen} />, label: 'Biệt danh', action: 'nickname' },
    { icon: <FontAwesomeIcon icon={faUsers} />, label: 'Tạo nhóm', action: 'group', separator: true },

    { icon: <FontAwesomeIcon icon={faBellSlash} />, label: 'Tắt thông báo', action: 'mute' },
    { icon: <FontAwesomeIcon icon={faBan} />, label: 'Chặn', action: 'block', color: 'red' },
];

const ChatHeader: React.FC<ChatWidgetWindowHeaderProps> = ({ setIsOpenChatWidget, conversationInfo }) => {
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    return (
        <div className={cx('chat-header')}>
            <div>
                <TippyMenu
                    renderMenu={<ActionMenu data={MENU_ITEMS} />}
                    placement="bottom-end"
                    onClickOutside={() => setContextMenuVisible(false)}
                    visible={contextMenuVisible}
                >
                    <div className={cx('chat-user-info')} onClick={() => setContextMenuVisible(!contextMenuVisible)}>
                        <div className={cx('user-avatar')}>
                            <Img circle src={baseUrl(conversationInfo.avatar)} />
                            <div className={cx('online-indicator')}></div>
                        </div>
                        <div>
                            <div>
                                <div className={cx('chat-username')} title={conversationInfo.name}>
                                    {conversationInfo.name}
                                </div>
                                <span className={cx('online-time')}>Hoạt động 5 phút trước</span>
                            </div>
                        </div>
                    </div>
                </TippyMenu>
            </div>
            <div className={cx('chat-actions')}>
                <button className={cx('chat-action-btn', 'call-audio')}>
                    <FontAwesomeIcon icon={faPhone} />
                </button>
                <button className={cx('chat-action-btn', 'call-video')}>
                    <FontAwesomeIcon icon={faVideo} />
                </button>
                <button className={cx('chat-action-btn', 'close')} onClick={() => setIsOpenChatWidget(false)}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
            </div>
        </div>
    );
};

export default ChatHeader;
