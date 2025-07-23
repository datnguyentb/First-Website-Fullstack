import classNames from 'classnames/bind';
import styles from './AdminPost.module.scss';
import baseUrl from '~/helper/baseUrl';
import { formatDateTimeFullEN } from '~/utils/dateUtils';
import PostContent from '~/pages/Home/components/Posts/PostContent';

const cx = classNames.bind(styles);

function AdminPostDetail({ post, onClose, onDeleteForever, onRestore }) {
    if (!post) return null;

    const { authorId, createdAt, privacy, deleted } = post;

    return (
        <div className={cx('post-detail')}>
            <button className={cx('close-btn')} onClick={onClose}>
                ×
            </button>
            <h3>Post Details</h3>

            {/* Info */}
            <div className={cx('meta')}>
                <p>
                    <strong>AuthorId:</strong> {authorId._id}
                </p>
                <p>
                    <strong>Author:</strong> {authorId.firstName} {authorId.lastName}
                </p>
                <p>
                    <strong>Email:</strong> {authorId.email}
                </p>
                <p>
                    <strong>Role:</strong> {authorId.role}
                </p>
                <p>
                    <strong>Account Created:</strong> {formatDateTimeFullEN(authorId.createdAt)}
                </p>
                <p>
                    <strong>Privacy:</strong> {privacy}
                </p>
                <p>
                    <strong>Created At:</strong> {formatDateTimeFullEN(createdAt)}
                </p>
                <p>
                    <strong>Status:</strong> {deleted ? 'Deleted' : 'Active'}
                </p>
            </div>
            <PostContent post={post} />

            {/* Actions */}
            <div className={cx('actions')}>
                {deleted ? (
                    <button className={cx('btn', 'btn-restore')} onClick={() => onRestore(post._id)}>
                        Restore Post
                    </button>
                ) : null}
                <button className={cx('btn', 'btn-danger')} onClick={() => onDeleteForever(post._id)}>
                    Delete Permanently
                </button>
            </div>
        </div>
    );
}

export default AdminPostDetail;
