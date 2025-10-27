import classNames from 'classnames/bind';
import styles from './ChatWidget.module.scss';
import { ChatMessages, ChatHeader, FriendsListWindow } from './components';
import ChatInput from './components/ChatInput';
import { useState } from 'react';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(styles);

function ChatWidget() {
    const [isShowFriendsList, setIsShowFriendsList] = useState(false);
    return (
        <div className={cx('chat-widget')}>
            {isShowFriendsList && <FriendsListWindow setIsShowFriendsList={setIsShowFriendsList} />}
            <div className={cx('chat-window')}>
                <ChatHeader />
                <ChatMessages setIsShowFriendsList={setIsShowFriendsList} />
                <ChatInput />
            </div>
            {!isShowFriendsList && (
                <div className={cx('on-off-friends-list')} onClick={() => setIsShowFriendsList(true)}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </div>
            )}
        </div>
    );
}

export default ChatWidget;
