import Post from './Post.jsx';
import { usePostsContext } from '~/contexts';

function Posts() {
    const { posts, setPosts, loading } = usePostsContext();

    if (loading) return <div>Đang tải bài viết...</div>;
    return (
        <div>
            {posts.map((post) => (
                <Post key={post._id} setPosts={setPosts} post={post} />
            ))}
        </div>
    );
}

export default Posts;
