import classNames from 'classnames/bind';
import styles from './AdminPost.module.scss';
import useFetchAllPosts from '~/hooks/admin/post/useFetchAllPosts';
import useDeletePost from '~/hooks/admin/post/useDeletePost';
import useDeleteForever from '~/hooks/admin/post/useDeleteForever';
import AdminPostDetail from './AdminPostDetail';
import { useAdminPost } from './useAdminPost';
import AdminPostList from './AdminPostList';
import AdminPostDialog from './AdminPostDialog';
import { useRef } from 'react';
import { Loading } from '~/components';
import useRestorePost from '~/hooks/admin/post/useRestorePost';

const cx = classNames.bind(styles);

function AdminPost() {
    const { posts, setPosts, loading: loadingGetPosts, error: GetPostsError } = useFetchAllPosts();
    const { deletePost } = useDeletePost();
    const { deleteForeverPost } = useDeleteForever();
    const { restorePost } = useRestorePost();
    const reasonRef = useRef();
    const {
        dialog,
        setDialog,
        postId,
        setPostId,
        isShowPostDetail,
        setIsShowPostDetail,
        postDetail,
        setPostDetail,
        postIndexActive,
        setPostIndexActive,
    } = useAdminPost();

    // ==== XỬ LÝ DIALOG ====

    const openDialog = ({ title, confirmText, reasonTitle, sendToUser = false, onConfirm }) => {
        setDialog({
            show: true,
            title,
            confirmText,
            reasonTitle,
            sendToUser,
            onConfirm,
        });
    };

    const handleCancelDialog = () => {
        setDialog((prev) => ({ ...prev, show: false }));
    };

    // ==== CÁC HÀM HÀNH ĐỘNG ====

    const handleSoftDelete = () => {
        openDialog({
            title: 'Confirm soft delete post',
            confirmText: 'Delete',
            reasonTitle: 'Reason for deletion:',
            sendToUser: true,
            onConfirm: handleSoftDeleteConfirm,
        });
    };

    const handleDeleteForever = () => {
        openDialog({
            title: 'Confirm permanent deletion of post',
            confirmText: 'Delete',
            onConfirm: handleDeleteForeverConfirm,
        });
    };

    const handleRestore = () => {
        openDialog({
            title: 'Confirm restore post',
            confirmText: 'Restore',
            onConfirm: handleRestoreConfirm,
        });
    };

    const handleSoftDeleteConfirm = async () => {
        const res = await deletePost(postId, reasonRef.current.value);

        if (res) {
            reasonRef.current.value = '';
            handleCancelDialog();
            setPosts((prevPosts) => prevPosts.map((post) => (post._id === postId ? { ...post, deleted: true } : post)));
            setPostDetail(res);
        }
    };

    const handleDeleteForeverConfirm = async () => {
        const res = await deleteForeverPost(postId);
        if (res) {
            handleCancelDialog();
            setIsShowPostDetail(false);
            setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
        }
    };

    const handleRestoreConfirm = async () => {
        const res = await restorePost(postId);
        if (res) {
            handleCancelDialog();

            setPosts((prevPosts) =>
                prevPosts.map((post) => (post._id === postId ? { ...post, deleted: false } : post)),
            );
            setPostDetail(res);
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
            {/* Action Dialog */}
            {dialog.show && <AdminPostDialog reasonRef={reasonRef} dialog={dialog} onCancel={handleCancelDialog} />}

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
