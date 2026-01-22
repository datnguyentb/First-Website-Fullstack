import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import styles from './ChatWidgetWindow.module.scss';
import Img from '~/components/Img';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';
import baseUrl from '~/helper/baseUrl';
import { ChatWidgetWindowHeaderProps } from '../ChatWidgetTypes';
import React, { useState } from 'react';
import ContextMenu from '../ContextMenu';

const cx = classNames.bind(styles);

const ChatHeader: React.FC<ChatWidgetWindowHeaderProps> = ({ setIsOpenChatWidget, conversationInfo }) => {
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    return (
        <div className={cx('chat-header')}>
            {conversationInfo && (
                <HeadlessTippy
                    interactive={true}
                    placement="bottom-end"
                    // offset={[-350, -52]}
                    onClickOutside={() => setContextMenuVisible(false)}
                    visible={contextMenuVisible}
                    render={(attrs, contentRef) => (
                        <div className="box" tabIndex={-1} ref={contentRef} {...attrs} style={{ zIndex: 9999 }}>
                            <ContextMenu />
                        </div>
                    )}
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
                </HeadlessTippy>
            )}
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
