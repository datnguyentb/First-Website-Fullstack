import Post from './Post.jsx';
import { usePosts } from '~/contexts/usePost';

function Posts() {
    const { posts, setPosts, loading } = usePosts();

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
