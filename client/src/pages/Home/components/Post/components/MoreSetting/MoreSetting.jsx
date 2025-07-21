import postApi from '~/api/postApi';
import { usePosts } from '~/contexts/usePost';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function MoreSetting({ id, onClick }) {
    const { setPosts } = usePosts();

    const handleDeletePost = async () => {
        const result = await Swal.fire({
            title: 'Bạn chắc chắn?',
            text: 'Bạn có muốn xóa bài viết này không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        });

        if (result.isConfirmed) {
            try {
                await postApi.deletePost(id);
                toast.success('Xóa bài viết thành công!');
                setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
            } catch (error) {
                console.error('Lỗi khi xóa bài viết:', error);
                toast.error('Xóa bài viết thất bại!');
            }
        }
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
                <li>
                    <button className="dropdown-item" type="button">
                        ✏️ Sửa bài viết
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => {
                            handleDeletePost();
                            onClick();
                        }}
                        className="dropdown-item"
                        type="button"
                    >
                        🗑️ Xóa bài viết
                    </button>
                </li>
                <li>
                    <button className="dropdown-item" type="button">
                        🙈 Ẩn bài viết
                    </button>
                </li>
                <li>
                    <button className="dropdown-item" type="button">
                        🚨 Báo cáo
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default MoreSetting;
