import postApi from '~/api/user/postApi';
import { usePosts } from '~/contexts/usePost';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function MoreSetting({ id, onClick, isAuthor }) {
    const { setPosts } = usePosts();

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
            try {
                await postApi.deletePost(id);
                toast.success('Post deleted successfully!');
                setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
            } catch (error) {
                console.error('Error deleting post:', error);
                toast.error('Failed to delete the post!');
            }
        }
    };

    const handleSavePost = async () => {
        toast.info('Save post feature is under development!');
    };

    const handleEditPost = async () => {
        toast.info('Edit post feature is under development!');
    };

    const handleHidePost = async () => {
        toast.info('Hide post feature is under development!');
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
        <div>
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
                        <button onClick={() => handleAction(item.action)} className="dropdown-item" type="button">
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MoreSetting;
