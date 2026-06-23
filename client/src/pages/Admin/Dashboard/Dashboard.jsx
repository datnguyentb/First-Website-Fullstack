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
        {
            to: '/admin/users',
            title: 'User Management',
            icon: '👥',
            describe: 'View, edit, suspend accounts, or assign system permissions to staff members.',
            number: userCount?.data,
        },
        {
            to: '/admin/posts',
            title: 'Posts',
            icon: '📝',
            describe: 'Moderate blogs, create news articles, and handle user comments or feedback.',
            number: postsCount,
        },
        {
            to: '/admin/system_slider',
            title: 'Slider & Marketing Banners',
            icon: '🖼️',
            describe: 'Update website carousels, change promotional banners, and toggle active campaign events.',
            number: postsCount,
        },
        {
            to: '/admin/violation_&_abuse_resports',
            title: 'Violation & Abuse Reports',
            icon: '🛡️',
            describe:
                'Review content flagged by users, moderate community violations, and manage temporary or permanent account bans.',
            number: postsReportedCount,
        },
        {
            to: '/admin/setting',
            title: 'Global Settings',
            icon: '⚙️',
            describe: 'Configure site metadata, adjust maintenance status, and update third-party API integrations.',
            number: postsCount,
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <header>
                <h2 className={cx('title')}>Admin Control Dashboard</h2>
                <span className={cx('sub')}>
                    Welcome back, Admin. Please select a management module below to proceed.
                </span>
            </header>

            <div className={cx('stats')}>
                {statsData.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
