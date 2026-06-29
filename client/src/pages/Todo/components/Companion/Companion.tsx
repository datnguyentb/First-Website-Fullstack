import classNames from 'classnames/bind';
import styles from './Companion.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faHeart, faMusic, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

export default function Companion() {
    const currentLevel = 1;
    const coins = 10;
    const petAvatar = '🌱';
    const petMood = 'Status: Dreaming';
    const timeLeftString = '25:00';
    const isClockRunning = false;
    const xpPercentage = 35;

    // --- STATE QUẢN LÝ LỰA CHỌN MỚI THÊM VÀO ---
    const [selectedSound, setSelectedSound] = useState<string>('none');
    const [selectedTask, setSelectedTask] = useState<string>('general');

    return (
        <div className={cx('premium-card')}>
            {/* Header Tiêu Đề Card */}
            <div className={cx('card-header-title')}>
                <FontAwesomeIcon icon={faHeart} className={cx('heart-icon')} />
                <span>Companion</span>
            </div>

            {/* Vùng Hiển Thị Thú Cưng */}
            <div className={cx('pet-display-box')}>
                <div className={cx('currency-bar')}>
                    <span>⭐ Lv.{currentLevel}</span>
                    <span className={cx('coins-span')}>
                        <FontAwesomeIcon icon={faCoins} /> {coins}
                    </span>
                </div>
                <div className={cx('pet-sprite')}>{petAvatar}</div>
                <div className={cx('pet-mood')}>{petMood}</div>

                <div className={cx('evolution-label')}>NEXT EVOLUTION:</div>
                <div className={cx('xp-line-container')}>
                    <div className={cx('xp-line-fill')} style={{ width: `${xpPercentage}%` }}></div>
                </div>
            </div>

            {/* Vùng Đồng Hồ Bấm Giờ Pomodoro */}
            <div className={cx('modern-timer-box')}>
                <div className={cx('modern-digits')}>{timeLeftString}</div>
                <div className={cx('timer-subtext')}>1 second study = +1 XP & +1 Coin</div>

                {/* --- KHU VỰC CHỌN TÍNH NĂNG PHỤ TRỢ (MỚI) --- */}
                <div className={cx('timer-controls-group')}>
                    {/* Chọn Công Việc Muốn Focus */}
                    <div className={cx('control-select-wrapper')}>
                        <FontAwesomeIcon icon={faBriefcase} className={cx('select-icon')} />
                        <select
                            value={selectedTask}
                            onChange={(e) => setSelectedTask(e.target.value)}
                            className={cx('timer-select')}
                        >
                            <option value="general">🎯 General Focus</option>
                            <option value="coding">💻 Coding / Tech</option>
                            <option value="reading">📚 Reading Books</option>
                            <option value="uiux">🎨 UI/UX Design</option>
                        </select>
                    </div>

                    {/* Chọn Âm Thanh Nền */}
                    <div className={cx('control-select-wrapper')}>
                        <FontAwesomeIcon icon={faMusic} className={cx('select-icon')} />
                        <select
                            value={selectedSound}
                            onChange={(e) => setSelectedSound(e.target.value)}
                            className={cx('timer-select')}
                        >
                            <option value="none">🔇 No Sound</option>
                            <option value="rain">🌧️ Cozy Rain</option>
                            <option value="lofi">☕ Lofi Chill Beats</option>
                            <option value="forest">🌲 Deep Forest Nature</option>
                            <option value="white">🤍 White Noise</option>
                        </select>
                    </div>
                </div>

                <button className={cx('pill-btn', { running: isClockRunning })}>
                    {isClockRunning ? 'PAUSE CHILL ☕' : 'START SESSION 🔥'}
                </button>
            </div>
        </div>
    );
}
