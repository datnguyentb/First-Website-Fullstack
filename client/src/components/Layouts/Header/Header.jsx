import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Button, Img } from '~/components';
import currentUser from '~/databseFake/currentUser';
import { UserDropdown, UserProfile } from './components';

const cx = classNames.bind(styles);

function Header() {
    const [userLogin, setUserLogin] = useState(null);
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
        setUserLogin(currentUser);
    }, []);

    const handleCloseProfile = () => {
        setShowProfile(false);
    };
    return (
        <div className={cx('wrapper')}>
            <div>{currentUser && showProfile && <UserProfile onClose={handleCloseProfile} />}</div>
            <div className={cx('container')}>
                <Button
                    className={cx('nav-back')}
                    onClick={() => setShowProfile(true)}
                    leftIcon={<FontAwesomeIcon icon={faCircleChevronLeft} className={cx('icon')} />}
                >
                    <span className={cx('ms-3')}>Back</span>
                </Button>
                <div className={cx('input-box')}>
                    <div className={cx('search-icon')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('icon')} />
                    </div>
                    <input
                        autoFocus="true"
                        type="text"
                        className={cx('search-input')}
                        placeholder="Search for courses, articles, videos..."
                    />
                </div>
                {userLogin ? (
                    <div className={cx('user-wrapper')}>
                        <div className={cx('your-post')}>
                            <Button className={cx('your-post-btn')}>Your Post</Button>
                        </div>
                        <div className={cx('user_notice')}>
                            <Tippy
                                placement="bottom"
                                interactive
                                render={(attrs, contentRef) => (
                                    <div className="box" tabIndex="-1" ref={contentRef} {...attrs}>
                                        <UserDropdown />
                                    </div>
                                )}
                            >
                                <div className={cx('user-avatar', 'ms-3')}>
                                    <Img src={userLogin.Img} />
                                </div>
                            </Tippy>
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
