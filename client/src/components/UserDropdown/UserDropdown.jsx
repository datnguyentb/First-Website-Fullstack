import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './UserDropdown.module.scss';

const cx = classNames.bind(styles);

function UserDropdownPanel() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={cx('wrapper')} tabIndex={-1}>
            <div className={cx('header')}>
                <img src="https://i.pravatar.cc/40" alt="avatar" className={cx('avatar')} />
                <div>
                    <p className={cx('name')}>Nguyễn Tiến Đạt</p>
                    <span className={cx('badge')}>BASIC</span>
                </div>
            </div>

            <button className={cx('upgrade-btn')}>Nâng cấp tài khoản</button>

            <div className={cx('section')}>
                <p className={cx('section-title')}>Personal</p>
                <ul>
                    <li>
                        <i className="fa fa-user"></i> Profile
                    </li>
                    <li>
                        <i className="fa fa-tachometer-alt"></i> Dashboard
                    </li>
                    <li>
                        <i className="fa fa-file-alt"></i> My Posts
                    </li>
                    <li>
                        <i className="fa fa-bell"></i> Notifications
                    </li>
                </ul>
            </div>

            <div className={cx('section')}>
                <p className={cx('section-title')}>Settings</p>
                <ul>
                    <li>
                        <span>Dark mode</span>
                        <label className={cx('switch')}>
                            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                            <span className={cx('slider')}></span>
                        </label>
                    </li>
                    <li>
                        <span>Language (vi)</span>
                    </li>
                    <li>
                        <span>Help</span>
                    </li>
                    <li>
                        <span>Log out</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default UserDropdownPanel;
