import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Focus.module.scss';
import { desktopBackground } from '../../assets/imgs/background';
import {
    faChartPie,
    faCirclePause,
    faCirclePlay,
    faForward,
    faGear,
    faHeartPulse,
    faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const WHTIE_COLOR = '#fff';
const PRIMARY_COLOR = '#e54615';

function Focus() {
    const totalTime = 25 * 60; // 25 phút
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [percent, setPercent] = useState(100);
    const [isPaused, setIsPaused] = useState(true);

    // Đếm ngược mỗi giây
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isPaused]);

    // Cập nhật phần trăm mỗi khi timeLeft thay đổi
    useEffect(() => {
        setPercent(Math.round((timeLeft / totalTime) * 100));
    }, [timeLeft]);

    // Chuyển giây thành định dạng MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handlePauseResume = () => {
        setIsPaused((prev) => !prev); // chuyển đổi giữa pause và resume
    };

    const handleReset = () => {
        setTimeLeft(totalTime); // đưa về 25 phút
        setIsPaused(true); // tạm dừng lại sau reset (có thể chuyển thành false nếu bạn muốn chạy luôn)
    };

    return (
        <div className={cx('wrapper')} style={{ backgroundImage: `url(${desktopBackground.piture_5})` }}>
            <div className={cx('option')}>
                <div className={cx('option-icon')}>
                    <FontAwesomeIcon icon={faGear} />
                </div>
                <div className={cx('option-icon')}>
                    <FontAwesomeIcon icon={faChartPie} />
                </div>
            </div>

            <div className={cx('focus-time')}>
                <div
                    className={cx('focus-clock')}
                    style={{
                        background: `conic-gradient(${PRIMARY_COLOR} 0deg ${(100 - percent) * 3.6}deg, ${WHTIE_COLOR} ${(100 - percent) * 3.6}deg 360deg)`,
                    }}
                >
                    <div className={cx('focus-clock-center')}>
                        <div className={cx('clock-icon')}>
                            <FontAwesomeIcon icon={faHeartPulse} />
                        </div>
                        <p className={cx('title')}>Healing Soul</p>
                        <span className={cx('focus-timer')}>{formatTime(timeLeft)}</span>
                        <span className={cx('focus-percent')}>{percent}%</span>
                    </div>
                </div>

                <div className={cx('focus-setting')}>
                    <div onClick={handleReset} className={cx('focus-setting-icon')}>
                        <FontAwesomeIcon icon={faRotateLeft} />
                    </div>
                    <div
                        onClick={handlePauseResume}
                        className={cx('focus-setting-icon', 'pau_play', isPaused && 'd-none')}
                    >
                        <FontAwesomeIcon icon={faCirclePause} />
                    </div>
                    <div
                        onClick={handlePauseResume}
                        className={cx('focus-setting-icon', 'pau_play', !isPaused && 'd-none')}
                    >
                        <FontAwesomeIcon icon={faCirclePlay} />
                    </div>
                    <div className={cx('focus-setting-icon')}>
                        <FontAwesomeIcon icon={faForward} />
                    </div>
                </div>
            </div>

            <div className={cx('choose-select')}>
                <p className={cx('label')}>Every day is a chance to grow.</p>
                <label>Select todo to start: </label>
                <select className={cx('ms-3')} name="select-to-to" id="select-to-to">
                    <option value="1">Social Media</option>
                    <option value="2">maketing</option>
                </select>
            </div>
        </div>
    );
}

export default Focus;
