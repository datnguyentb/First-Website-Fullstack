import classNames from 'classnames/bind';
import styles from './ChatWidget.module.scss';
import { FriendsListWindow } from './components';
import ChatWidgetWindow from './components/ChatWidgetWindow';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ChatWidget({ setIsOpenChatWidget, userId }) {
    const [isShowFriendsList, setIsShowFriendsList] = useState(true);

    return (
        <div className={cx('chat-widget')}>
            {/* Friends list */}
            {isShowFriendsList && <FriendsListWindow setIsShowFriendsList={setIsShowFriendsList} />}

            {/* Chat window */}
            <div className={cx('chat-window')}>
                <ChatWidgetWindow
                    userId={userId}
                    setIsOpenChatWidget={setIsOpenChatWidget}
                    setIsShowFriendsList={setIsShowFriendsList}
                />
            </div>

            {/* Nút mở lại friend list */}
            {!isShowFriendsList && (
                <div className={cx('on-off-friends-list')} onClick={() => setIsShowFriendsList(true)}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </div>
            )}
        </div>
    );
}

export default ChatWidget;
