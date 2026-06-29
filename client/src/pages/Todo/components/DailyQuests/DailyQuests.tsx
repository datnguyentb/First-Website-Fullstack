import classNames from 'classnames/bind';
import styles from './DailyQuests.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faStore, faTrophy } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

export default function DailyQuests() {
    // Giả lập dữ liệu hiển thị (Cậu có thể truyền props hoặc nối state vào đây)
    const questProgress = 5; // Ví dụ đang chạy được 5/10 giây
    const totalXP = 120; // XP hiện tại của người dùng

    return (
        <div className={cx('premium-card')}>
            {/* PHẦN 1: DAILY QUESTS */}
            <div className={cx('card-header-title')}>
                <FontAwesomeIcon icon={faBolt} className={cx('icon-bolt')} />
                <span>Daily Quests</span>
            </div>
            <div className={cx('quest-item')}>
                <span>🎯 Practice for 10 seconds</span>
                <span className={cx('quest-status')}>
                    {questProgress >= 10 ? (
                        <b className={cx('claimed-text')}>CLAIMED +10 xu!</b>
                    ) : (
                        `${questProgress}/10s`
                    )}
                </span>
            </div>

            {/* PHẦN 2: OASIS SHOP */}
            <div className={cx('card-header-title')}>
                <FontAwesomeIcon icon={faStore} className={cx('icon-store')} />
                <span>Oasis Shop</span>
            </div>
            <div className={cx('shop-grid')}>
                <div className={cx('shop-item')}>
                    <div className={cx('shop-emoji')}>💧</div>
                    <div className={cx('shop-item-text')}>Water (15 Coins)</div>
                </div>
                <div className={cx('shop-item')}>
                    <div className={cx('shop-emoji')}>🍎</div>
                    <div className={cx('shop-item-text')}>Apple (25 Coins)</div>
                </div>
            </div>

            {/* PHẦN 3: LIVE STUDY ARENA */}
            <div className={cx('card-header-title')}>
                <FontAwesomeIcon icon={faTrophy} className={cx('icon-trophy')} />
                <span>Live Study Arena</span>
            </div>
            <div className={cx('leaderboard-list')}>
                <div className={cx('leader-row')}>
                    <span>1. 👑 Sora_Study</span>
                    <span>4500 XP</span>
                </div>
                <div className={cx('leader-row', 'me')}>
                    <span>2. ⚡ You (Studying)</span>
                    <span>{totalXP} XP</span>
                </div>
                <div className={cx('leader-row')}>
                    <span>3. Min_Min</span>
                    <span>0 XP</span>
                </div>
            </div>
        </div>
    );
}
