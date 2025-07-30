import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import { usePosts } from '~/contexts/usePost';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useSavePost from '~/hooks/postInteraction/useSavePost';
import useHidePost from '~/hooks/postInteraction/useHidePost';
import useDeletePost from '~/hooks/admin/post/useDeletePost';

const cx = classNames.bind(styles);

function MoreSetting({ id, onClick, isAuthor }) {
    const { setPosts } = usePosts();
    const { savePost } = useSavePost();
    const { hidePost } = useHidePost();
    const { deletePost } = useDeletePost();

    const handleDeletePost = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this post?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            const res = deletePost(id);
            if (res) {
                setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
            }
        }
    };

    const handleSavePost = async () => {
        savePost(id);
    };

    const handleEditPost = async () => {
        toast.info('Edit post feature is under development!');
    };

    const handleHidePost = async () => {
        hidePost(id);
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    };

    const handleReportPost = async () => {
        toast.info('Report feature is under development!');
    };

    const menuItems = isAuthor
        ? [
              { label: '✏️ Edit post', action: 'edit' },
              { label: '🗑️ Delete post', action: 'delete' },
              { label: '🙈 Hide post', action: 'hide' },
          ]
        : [
              { label: '💾 Save post', action: 'save' },
              { label: '🙈 Hide post', action: 'hide' },
              { label: '🚨 Report', action: 'report' },
          ];

    const handleAction = (action) => {
        switch (action) {
            case 'delete':
                handleDeletePost();
                break;
            case 'edit':
                handleEditPost();
                break;
            case 'hide':
                handleHidePost();
                break;
            case 'report':
                handleReportPost();
                break;
            case 'save':
                handleSavePost();
                break;
            default:
                break;
        }
        onClick();
    };

    return (
        <div className={cx('post-more-setting')}>
            <ul
                className="dropdown-menu show shadow"
                style={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    zIndex: 1000,
                    display: 'block',
                    minWidth: '200px',
                }}
            >
                {menuItems.map((item) => (
                    <li key={item.action}>
                        <button
                            onClick={() => handleAction(item.action)}
                            className={cx('dropdown-item', 'item-btn')}
                            type="button"
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MoreSetting;
