import classNames from 'classnames/bind';
import styles from './AdminPost.module.scss';
import AdminPostTable from './AdminPostTable';

const cx = classNames.bind(styles);
function AdminPostList({ setPostId, posts, postIndexActive, onShow }) {
    return (
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
                {posts.map((post, index) => (
                    <AdminPostTable
                        key={post._id}
                        setPostId={setPostId}
                        indexActive={postIndexActive}
                        post={post}
                        index={index}
                        onShow={onShow}
                    />
                ))}
            </table>
        </div>
    );
}

export default AdminPostList;
