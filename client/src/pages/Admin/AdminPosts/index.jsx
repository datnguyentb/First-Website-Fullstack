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
            title: 'Xác nhận xóa bài viết',
            confirmText: 'Xóa',
            reasonTitle: 'Lý do xóa:',
            sendToUser: true,
            onConfirm: handleSoftDeleteConfirm,
        });
    };

    const handleDeleteForever = () => {
        openDialog({
            title: 'Xác nhận xóa vĩnh viễn bài viết',
            confirmText: 'Xóa vĩnh viễn',
            onConfirm: handleDeleteForeverConfirm,
        });
    };

    const handleRestore = () => {
        openDialog({
            title: 'Xác nhận khôi phục bài viết',
            confirmText: 'Khôi phục',
            onConfirm: handleRestoreConfirm,
        });
    };

    const handleSoftDeleteConfirm = async () => {
        const res = await deletePost(postId, reasonRef.current.value);

        if (res) {
            reasonRef.current.value = '';
            handleCancelDialog();

            // ✅ Cập nhật danh sách bài viết sau khi xóa
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

    // ==== XỬ LÝ BÀI VIẾT ====

    const handleOnClose = () => {
        setIsShowPostDetail(false);
        setPostDetail(null);
    };

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

            {/* Chi tiết bài viết */}
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

            {/* Danh sách bài viết */}
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
