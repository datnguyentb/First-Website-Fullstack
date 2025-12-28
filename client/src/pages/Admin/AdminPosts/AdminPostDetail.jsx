import classNames from 'classnames/bind';
import styles from './AdminPost.module.scss';
import baseUrl from '~/helper/baseUrl';
import { formatDateTimeFullEN } from '~/utils/dateUtils';
import PostContent from '~/pages/Home/components/Posts/PostContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AdminPostDetail({ post, onClose, onSoftDelete, onDeleteForever, onRestore }) {
    if (!post) return null;

    const { author, _id, createdAt, privacy, deleted, tag, likeCount, commentCount, isEdited, reportedBy } = post;

    return (
        <div className={cx('post-detail')}>
            <div className={cx('header')}>
                <h3>Post Details</h3>
                <button className={cx('close-btn')} onClick={onClose}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
            </div>
            <div className={cx('main-content', 'mt-3')}>
                <div className={cx('content')}>
                    {/* Post Info */}
                    <div className={cx('column')}>
                        <h4>Post Information</h4>
                        <p>
                            <strong>ID:</strong> {_id}
                        </p>
                        <p>
                            <strong>Created At:</strong> {formatDateTimeFullEN(createdAt)}
                        </p>
                        <p>
                            <strong>Privacy:</strong> {privacy}
                        </p>
                        <p>
                            <strong>Tag:</strong> {tag?.join(', ') || 'None'}
                        </p>
                        <p>
                            <strong>Like Count:</strong> {likeCount}
                        </p>
                        <p>
                            <strong>Comment Count:</strong> {commentCount}
                        </p>
                        <p>
                            <strong>Is Edited:</strong> {isEdited ? 'Yes' : 'No'}
                        </p>
                        <p>
                            <strong>Reported By:</strong> {reportedBy?.length || 0} user(s)
                        </p>
                        <p>
                            <strong>Status:</strong> {deleted ? 'Deleted' : 'Active'}
                        </p>
                    </div>

                    {/* Author Info */}
                    <div className={cx('column')}>
                        <h4>Author Information</h4>
                        <img className={cx('avatar')} src={baseUrl(author.avatar)} alt="avatar" />
                        <p>
                            <strong>ID:</strong> {author._id}
                        </p>
                        <p>
                            <strong>Name:</strong> {author.firstName} {author.lastName}
                        </p>
                        <p>
                            <strong>Email:</strong> {author.email}
                        </p>
                    </div>
                </div>

                <div className={cx('actions')}>
                    {deleted ? (
                        <button className={cx('btn', 'btn-restore')} onClick={() => onRestore(post._id)}>
                            Restore Post
                        </button>
                    ) : (
                        <button className={cx('btn', 'btn-danger')} onClick={() => onSoftDelete(post._id)}>
                            Soft Delete
                        </button>
                    )}
                    <button className={cx('btn', 'btn-danger')} onClick={() => onDeleteForever(post._id)}>
                        Delete Permanently
                    </button>
                </div>

                <div className={cx('post-content-wrapper', 'mt-3')}>
                    <h4>Post Preview</h4>
                    <PostContent post={post} />
                </div>
            </div>
        </div>
    );
}

export default AdminPostDetail;
