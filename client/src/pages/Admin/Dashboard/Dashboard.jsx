import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import useFetchUserNumber from '~/hooks/admin/user/useFetchUserNumber';
import useFetchPostsNumber from '~/hooks/admin/post/useFetchPostsNumber';
import { StatCard } from '~/components';

const cx = classNames.bind(styles);

function Dashboard() {
    const { userCount, loading: loadingUser, error: errorUser } = useFetchUserNumber();
    const { postsCount, postsReportedCount, loading: loadingPost, error: errorPost } = useFetchPostsNumber();

    useEffect(() => {
        document.title = 'Admin Dashboard';
    }, []);

    const statsData = [
        { to: '/admin/users', title: 'Người dùng', number: userCount?.data },
        { to: '/admin/posts', title: 'Bài viết', number: postsCount },
        { title: 'Báo cáo vi phạm', number: postsReportedCount },
    ];

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Dashboard</h2>
            <div className={cx('stats')}>
                {statsData.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
