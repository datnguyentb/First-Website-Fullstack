import classNames from 'classnames/bind';
import styles from './Todo.module.scss';
import { useEffect } from 'react';
import Companion from './components/Companion';
import MissionDeck from './components/MissionDeck';
import DailyQuests from './components/DailyQuests/DailyQuests';

const cx = classNames.bind(styles);

function Todo() {
    // --- 1. KHỞI TẠO & AUTO RESET THEO NGÀY (LIFECYCLE) ---
    useEffect(() => {
        document.title = 'Twirl | Todo';
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Companion />
                <MissionDeck />
                <DailyQuests />
            </div>
        </div>
    );
}

export default Todo;
