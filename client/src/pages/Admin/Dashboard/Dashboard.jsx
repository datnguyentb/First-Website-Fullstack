import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import { Link } from 'react-router-dom';
import useFetchUserNumber from '~/hooks/admin/user/useFetchUserNumber';
import useFetchPostsNumber from '~/hooks/admin/post/useFetchPostsNumber';

const cx = classNames.bind(styles);

function Dashboard() {
    const { userCount, loading: loadingUser, error: errorUser } = useFetchUserNumber();

    const { postsCount, postsReportedCount, loading: loadingPost, error: errorPost } = useFetchPostsNumber();

    useEffect(() => {
        document.title = 'Admin Dashboard';
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Dashboard</h2>
            <div className={cx('stats')}>
                <Link to="/admin/users" className={cx('card')}>
                    <h3 className={cx('cardTitle')}>Người dùng</h3>
                    {!loadingUser && !errorUser && userCount && <p className={cx('cardValue')}>{userCount.data}</p>}
                </Link>

                <Link to="/admin/posts" className={cx('card')}>
                    <h3 className={cx('cardTitle')}>Bài viết</h3>
                    {!loadingPost && !errorPost && postsCount && <p className={cx('cardValue')}>{postsCount}</p>}
                </Link>
                <div className={cx('card')}>
                    <h3 className={cx('cardTitle')}>Báo cáo vi phạm</h3>
                    {!loadingPost && !errorPost && postsCount && (
                        <p className={cx('cardValue')}>{postsReportedCount}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
