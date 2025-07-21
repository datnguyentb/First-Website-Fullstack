import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Dashboard() {
    useEffect(() => {
        document.title = 'Admin Dashboard';
    }, []);
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Dashboard</h2>
            <div className={cx('stats')}>
                <Link to="/admin/user" className={cx('card')}>
                    <h3 className={cx('cardTitle')}>Người dùng</h3>
                    <p className={cx('cardValue')}>1,234</p>
                </Link>
                <Link to="/admin/Post" className={cx('card')}>
                    <h3 className={cx('cardTitle')}>Bài viết</h3>
                    <p className={cx('cardValue')}>567</p>
                </Link>
                <div className={cx('card')}>
                    <h3 className={cx('cardTitle')}>Báo cáo vi phạm</h3>
                    <p className={cx('cardValue')}>12</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
