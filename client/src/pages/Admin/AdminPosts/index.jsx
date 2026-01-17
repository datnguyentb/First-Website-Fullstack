import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import styles from './AdminPost.module.scss';
import useFetchAllPosts from '~/hooks/admin/post/useFetchAllPosts';
import useDeletePost from '~/hooks/admin/post/useDeletePost';
import useDeleteForever from '~/hooks/admin/post/useDeleteForever';
import AdminPostDetail from './AdminPostDetail';
import { useAdminPost } from './useAdminPost';
import AdminPostList from './AdminPostList';
import { Loading } from '~/components';
import useRestorePost from '~/hooks/admin/post/useRestorePost';
import { useModalContext } from '~/contexts';

const cx = classNames.bind(styles);

function AdminPost() {
    const { posts, setPosts, loading: loadingGetPosts, error: GetPostsError } = useFetchAllPosts();
    const { deletePost } = useDeletePost();
    const { deleteForeverPost } = useDeleteForever();
    const { restorePost } = useRestorePost();
    const { showModal } = useModalContext();
    const {
        postId,
        setPostId,
        isShowPostDetail,
        setIsShowPostDetail,
        postDetail,
        setPostDetail,
        postIndexActive,
        setPostIndexActive,
    } = useAdminPost();

    const handleCancelDialog = () => {
        setDialog((prev) => ({ ...prev, show: false }));
    };

    // ==== CÁC HÀM HÀNH ĐỘNG ====

    const handleSoftDelete = () => {
        showModal({
            title: `Confirm soft delete post`,
            reasonTitle: 'Reason for deletion:',
            confirmText: 'Delete',
            type: 'delete',
            onConfirm: ({ reason, sendToUser }) => {
                handleSoftDeleteConfirm(reason, sendToUser);
            },
        });
    };

    const handleDeleteForever = () => {
        showModal({
            type: 'delete',
            title: 'Are you sure?',
            description: 'Do you really want to delete this post? This action cannot be undone.',
            confirmText: 'Delete',
            onConfirm: () => handleDeleteForeverConfirm(),
        });
    };

    const handleRestore = () => {
        showModal({
            title: 'Confirm restore post',
            confirmText: 'Restore',
            type: 'confirm',
            onConfirm: () => {
                handleRestoreConfirm();
            },
        });
    };

    const handleSoftDeleteConfirm = async (reason) => {
        const res = await deletePost(postId, reason);
        if (res?.success) {
            setPosts((prevPosts) => prevPosts.map((post) => (post._id === postId ? { ...post, deleted: true } : post)));
            setPostDetail(res.data);
            toast.success('Post deleted successfully!');
        } else {
            toast.error('Failed to delete the post!');
        }
    };

    const handleDeleteForeverConfirm = async () => {
        const res = await deleteForeverPost(postId);
        if (res?.success) {
            setIsShowPostDetail(false);
            setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
            toast.success('Deleted successfully!');
        } else {
            toast.error('Failed to delete the post!');
        }
    };

    const handleRestoreConfirm = async () => {
        const res = await restorePost(postId);
        if (res?.success) {
            setPosts((prevPosts) =>
                prevPosts.map((post) => (post._id === postId ? { ...post, deleted: false } : post)),
            );
            setPostDetail(res.data);
            toast.success('Post restored successfully!');
        } else {
            toast.error('Failed to restore the post.');
        }
    };

    //close Post detail
    const handleOnClose = () => {
        setIsShowPostDetail(false);
        setPostDetail(null);
    };

    //show post detail
    const handleClickPost = (post, index) => {
        setIsShowPostDetail(true);
        setPostDetail(post);
        setPostIndexActive(index);
    };

    if (loadingGetPosts)
        return (
            <div className={cx('wrapper')}>
                <Loading />
            </div>
        );
    if (GetPostsError) return <div className={cx('wrapper')}>An error occurred while loading data!</div>;

    return (
        <div className={cx('wrapper')}>
            {/* Post detail */}
            {postDetail && isShowPostDetail && (
                <AdminPostDetail
                    post={postDetail}
                    showDialog
                    onClose={handleOnClose}
                    onSoftDelete={handleSoftDelete}
                    onDeleteForever={handleDeleteForever}
                    onRestore={handleRestore}
                />
            )}

            {/* Posts list */}
            <AdminPostList
                setPostId={setPostId}
                posts={posts}
                postIndexActive={postIndexActive}
                onShow={handleClickPost}
            />
        </div>
    );
}

export default AdminPost;
