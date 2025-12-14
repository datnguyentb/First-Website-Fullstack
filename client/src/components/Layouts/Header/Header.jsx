import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { useState } from 'react';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMessage } from '@fortawesome/free-solid-svg-icons';
import { Button, ChatWidget, Img } from '~/components';
import Search from './components/Search';
import { MessagerWidget, Notification, UserDropdownPanel, UserProfile } from './components';
import baseUrl from '~/helper/baseUrl';
import { useChatWidgetContext, useUserContext } from '~/contexts';

const cx = classNames.bind(styles);

function Header({ style_2 = false }) {
    const [isVisibleMessagerWidget, setIsVisibleMessagerWidget] = useState(false); // Trạng thái hiển thị MessagerWidget
    const { isOpenChatWidget, setIsOpenChatWidget, userId } = useChatWidgetContext();
    const { user } = useUserContext() ?? {};

    const [showProfile, setShowProfile] = useState(false);

    const handleShowProfile = () => {
        setShowProfile(true);
    };

    const handleCloseProfile = () => {
        setShowProfile(false);
    };

    //Funtion to toggle MessagerWidget visibility
    // Hàm đóng Popover
    const handleHideMessagerWidget = () => setIsVisibleMessagerWidget(false);

    // Hàm bật/tắt Popover
    const handleToggle = () => setIsVisibleMessagerWidget((prev) => !prev);

    return (
        <div className={cx('wrapper')}>
            <div>{user && showProfile && <UserProfile onClose={handleCloseProfile} userId={user._id} />}</div>
            {isOpenChatWidget && <ChatWidget setIsOpenChatWidget={setIsOpenChatWidget} userId={userId} />}
            <div className={cx('container', style_2 && 'style_2')}>
                <Search />
                {user ? (
                    <div className={cx('user-wrapper')}>
                        <div>
                            <HeadlessTippy
                                interactive={true}
                                placement="bottom-start"
                                onClickOutside={handleHideMessagerWidget}
                                visible={isVisibleMessagerWidget}
                                render={(attrs, contentRef) => (
                                    <div
                                        className="box"
                                        tabIndex="-1"
                                        ref={contentRef}
                                        {...attrs}
                                        style={{ zIndex: 9999 }}
                                    >
                                        <MessagerWidget handleHideMessagerWidget={handleHideMessagerWidget} />
                                    </div>
                                )}
                            >
                                <div className={cx('message-icon', 'action-btn')} onClick={handleToggle}>
                                    <FontAwesomeIcon icon={faMessage} />
                                </div>
                            </HeadlessTippy>
                        </div>
                        <div>
                            <HeadlessTippy
                                trigger="click"
                                interactive={true}
                                placement="bottom-start"
                                render={(attrs) => (
                                    <div tabIndex="-1" {...attrs}>
                                        <Notification />
                                    </div>
                                )}
                            >
                                <Button
                                    className={cx('bell-icon', 'action-btn')}
                                    badge={5}
                                    leftIcon={<FontAwesomeIcon icon={faBell} />}
                                ></Button>
                            </HeadlessTippy>
                        </div>
                        <div className={cx('user_notice')}>
                            <HeadlessTippy
                                placement="bottom"
                                interactive
                                render={(attrs, contentRef) => (
                                    <div className="box" tabIndex="-1" ref={contentRef} {...attrs}>
                                        <UserDropdownPanel user_onclick={handleShowProfile} />
                                    </div>
                                )}
                            >
                                <div className={cx('user-avatar', 'ms-3')}>
                                    <Img src={baseUrl(user.avatarUrl)} />
                                </div>
                            </HeadlessTippy>
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

Header.propTypes = {
    style_2: PropTypes.bool,
};

export default Header;
