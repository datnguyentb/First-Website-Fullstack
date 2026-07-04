import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMessage } from '@fortawesome/free-solid-svg-icons';
import { Button, ChatWidget, Img } from '~/components';
import Search from './components/Search';
import { MessagerWidget, Notification, UserDropdownPanel, UserProfile } from './components';
import baseUrl from '~/helper/baseUrl';
import { useChatWidgetContext, useNotificationsContext, useUserContext } from '~/contexts';
import TippyMenu from '~/components/TippyMenu/TippyMenu';

const cx = classNames.bind(styles);

function Header({ style_2 = false }) {
    const [isVisibleMessagerWidget, setIsVisibleMessagerWidget] = useState(false); // Trạng thái hiển thị MessagerWidget
    const { isOpenChatWidget, setIsOpenChatWidget, conversationId, isShowFriendsList, setIsShowFriendsList } =
        useChatWidgetContext();
    const { user } = useUserContext() ?? {};
    const { unreadCount } = useNotificationsContext();

    const [showProfile, setShowProfile] = useState(false);

    const handleShowProfile = () => {
        setShowProfile(true);
    };

    const handleCloseProfile = () => {
        setShowProfile(false);
    };

    const handleHideMessagerWidget = () => setIsVisibleMessagerWidget(false);

    // Hàm bật/tắt Popover
    const handleToggle = () => setIsVisibleMessagerWidget((prev) => !prev);

    return (
        <div className={cx('wrapper')}>
            <div>{user && showProfile && <UserProfile onClose={handleCloseProfile} userId={user._id} />}</div>
            {isOpenChatWidget && (
                <ChatWidget
                    setIsOpenChatWidget={setIsOpenChatWidget}
                    conversationId={conversationId}
                    isShowFriendsList={isShowFriendsList}
                    setIsShowFriendsList={setIsShowFriendsList}
                />
            )}
            <div className={cx('container', style_2 && 'style_2')}>
                <Search />
                {user ? (
                    <div className={cx('user-wrapper')}>
                        <div>
                            <TippyMenu
                                renderMenu={<MessagerWidget handleHideMessagerWidget={handleHideMessagerWidget} />}
                                interactive={true}
                                placement="bottom-start"
                                onClickOutside={handleHideMessagerWidget}
                                visible={isVisibleMessagerWidget}
                            >
                                <div className={cx('message-icon', 'action-btn')} onClick={handleToggle}>
                                    <FontAwesomeIcon icon={faMessage} />
                                </div>
                            </TippyMenu>
                        </div>
                        <div>
                            <TippyMenu
                                renderMenu={<Notification />}
                                placement="bottom-end"
                                offset={[0, 0]}
                                trigger="click"
                            >
                                <Button
                                    className={cx('bell-icon', 'action-btn')}
                                    badge={unreadCount > 0 ? unreadCount : undefined}
                                    leftIcon={<FontAwesomeIcon icon={faBell} />}
                                ></Button>
                            </TippyMenu>
                        </div>
                        <div className={cx('user_notice')}>
                            <TippyMenu
                                renderMenu={<UserDropdownPanel user_onclick={handleShowProfile} />}
                                placement="bottom"
                                trigger="click"
                            >
                                <div className={cx('user-avatar', 'ms-3')}>
                                    <Img src={baseUrl(user.avatar)} />
                                </div>
                            </TippyMenu>
                        </div>
                    </div>
                ) : (
                    <div className={cx('auth-buttons')}>
                        <Button to="/auth/register">Sign up</Button>
                        <Button to="/auth/login" primary rounded>
                            Sign in
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
