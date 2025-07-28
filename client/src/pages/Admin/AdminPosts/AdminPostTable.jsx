import classNames from 'classnames/bind';
import styles from './AdminPost.module.scss';
import { formatDateTimeFullEN } from '~/utils/dateUtils';
import baseUrl from '~/helper/baseUrl';

const cx = classNames.bind(styles);

function AdminPostTable({ post, setPostId, index, indexActive, onShow }) {
    index += 1;
    const typePrivacy = post.privacy === 'private' ? 'private' : post.privacy === 'public' ? 'public' : 'friend';
    const isActive = indexActive === index;
    const handleClickPost = async () => {
        await setPostId(post._id);
        onShow(post, index);
    };
    return (
        <tbody className={cx('post-table', isActive && 'active')} onClick={handleClickPost}>
            <tr>
                <td>{index}</td>
                {post.content ? (
                    <td className={cx('content')}>{post.content}</td>
                ) : (
                    <td className={cx('img-only')}>
                        <img src={baseUrl(post.images[0])} alt="thumbnail" className={cx('thumbnail')} />
                        <span>(Image only)</span>
                    </td>
                )}

                <td>{`${post.author.firstName} ${post.author.lastName}`}</td>
                <td>
                    <span className={cx('badge', `badge-${typePrivacy}`)}>{post.privacy}</span>
                    {post.deleted && <span className={cx('badge', 'badge-deleted')}>Deleted</span>}
                </td>
                <td>{formatDateTimeFullEN(post.createdAt)}</td>
                <td>
                    <button className={cx('btn', 'btn-small')}>View</button>
                    <button className={cx('btn', 'btn-danger', 'btn-small')}>Soft Delete</button>
                </td>
            </tr>
        </tbody>
    );
}

export default AdminPostTable;
