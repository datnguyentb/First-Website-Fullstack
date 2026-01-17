import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { usePostsContext, useModalContext } from '~/contexts';
import { toast } from 'react-toastify';
import useSavePost from '~/hooks/postInteraction/useSavePost';
import useHidePost from '~/hooks/postInteraction/useHidePost';
import useDeletePost from '~/hooks/post/useDeletePost';
import useUnsavePost from '~/hooks/postInteraction/useUnsavePost';
import useReportPost from '~/hooks/postInteraction/useReportPost';

const cx = classNames.bind(styles);

function MoreSetting({ id, isSaved, onClick, isAuthor }) {
    //Context
    const { setPosts } = usePostsContext();
    const { showModal } = useModalContext();

    //
    const { savePost } = useSavePost();
    const { unsavePost } = useUnsavePost();
    const { hidePost } = useHidePost();
    const { deletePost } = useDeletePost();
    const { reportPost } = useReportPost();

    const handleDeletePost = async () => {
        showModal({
            type: 'delete',
            title: 'Are you sure?',
            description: 'Do you really want to delete this post?',
            confirmText: 'Delete',
            onConfirm: async () => {
                const res = await deletePost(id);
                if (res?.success) {
                    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
                    toast.success('Post deleted successfully!');
                } else {
                    toast.error('Failed to delete the post!');
                }
            },
        });
    };

    const handleSavePost = async () => {
        savePost(id);
        setPosts((prevPosts) => prevPosts.map((post) => (post._id === id ? { ...post, isSaved: true } : post)));
    };

    const handleUnsavePost = async () => {
        unsavePost(id);
        setPosts((prevPosts) => prevPosts.map((post) => (post._id === id ? { ...post, isSaved: false } : post)));
    };

    const handleEditPost = async () => {
        toast.info('Edit post feature is under development!');
    };

    const handleHidePost = async () => {
        hidePost(id);
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    };

    const handleReportPost = async () => {
        showModal({
            title: `Report Post`,
            reasonTitle: 'Reason for reporting this post',
            confirmText: 'Submit Report',
            type: 'report',
            onConfirm: ({ reason }) => {
                const res = reportPost(id, reason);
                if (res) {
                    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
                }
            },
        });
    };

    const menuItems = isAuthor
        ? [
              {
                  label: 'Edit post',
                  action: 'edit',
                  icon: <i className="bi bi-pencil-square"></i>,
              },
              {
                  label: 'Delete post',
                  action: 'delete',
                  icon: <i className="bi bi-trash3-fill"></i>,
              },
              {
                  label: 'Hide post',
                  action: 'hide',
                  icon: <i className="bi bi-x-square-fill"></i>,
              },
          ]
        : [
              isSaved
                  ? {
                        label: 'Unsave post',
                        action: 'unsave',
                        icon: <i className="bi bi-bookmark-x"></i>,
                    }
                  : {
                        label: 'Save post',
                        action: 'save',
                        icon: <i className="bi bi-bookmark"></i>,
                    },
              {
                  label: 'Hide post',
                  action: 'hide',
                  icon: <i className="bi bi-x-square-fill"></i>,
              },
              {
                  label: 'Report post',
                  action: 'report',
                  icon: <i className="bi bi-flag-fill"></i>,
              },
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
            case 'unsave':
                handleUnsavePost();
                break;
            default:
                break;
        }
        onClick();
    };

    return (
        <div className={cx('post-more-setting')}>
            <ul>
                {menuItems.map((item) => (
                    <li key={item.action} className={cx('item')}>
                        <button
                            onClick={() => handleAction(item.action)}
                            className={cx('d-flex', 'align-item-center')}
                            type="button"
                        >
                            {item.icon}
                            <span className={cx('ms-3')}>{item.label}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MoreSetting;
