import classNames from 'classnames/bind';
import styles from './AdminPost.module.scss';
import useFetchAllPosts from '~/hooks/admin/post/useFetchAllPosts';
import AdminPostTable from './AdminPostTable';
import AdminPostDetail from './AdminPostDetail';

const cx = classNames.bind(styles);

function AdminPost() {
    const { posts, loading, error } = useFetchAllPosts();

    if (loading) {
        return <div className={cx('wrapper')}>Loading posts...</div>;
    }

    if (error) {
        return <div className={cx('wrapper')}>An error occurred while loading data!</div>;
    }

    return (
        <div className={cx('wrapper')}>
            <AdminPostDetail post={posts.data[53]} />
            <div id="posts" className={cx('content-section')}>
                <h2 className={cx('header')}>Post List</h2>
                <table>
                    <thead>
                        <tr>
                            <th className={cx('title')}>No.</th>
                            <th className={cx('title')}>Content</th>
                            <th className={cx('title')}>Author</th>
                            <th className={cx('title')}>Status</th>
                            <th className={cx('title')}>Created At</th>
                            <th className={cx('title')}>Actions</th>
                        </tr>
                    </thead>
                    {posts.data.map((post, index) => (
                        <AdminPostTable key={post._id} post={post} index={index} />
                    ))}
                </table>
            </div>
        </div>
    );
}

export default AdminPost;
