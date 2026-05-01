import classNames from 'classnames/bind';
import styles from './ChatWidget.module.scss';
import { FriendsListWindow } from './components';
import { ChatWidgetWindow } from './components';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { ChatWidgetProps } from './ChatWidgetTypes';

const cx = classNames.bind(styles);

const ChatWidget: React.FC<ChatWidgetProps> = ({
    setIsOpenChatWidget,
    conversationId,
    isShowFriendsList,
    setIsShowFriendsList,
}) => {
    return (
        <div className={cx('chat-widget')}>
            {/* Friends list */}
            {isShowFriendsList && <FriendsListWindow setIsShowFriendsList={setIsShowFriendsList} />}

            {/* Chat window */}
            <div className={cx('chat-window')}>
                <ChatWidgetWindow
                    setIsOpenChatWidget={setIsOpenChatWidget}
                    setIsShowFriendsList={setIsShowFriendsList}
                    conversationId={conversationId}
                    isShowFriendsList={isShowFriendsList}
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
};

export default ChatWidget;
