import Post from './Post.jsx';
import { usePostsContext } from '~/contexts';
import Loading from '~/components/Loading';

function Posts() {
    const { posts, setPosts, loading } = usePostsContext();
    if (loading)
        return (
            <div>
                <Loading />
            </div>
        );
    return (
        <div>
            {posts.map((post) => (
                <Post key={post._id} setPosts={setPosts} post={post} />
            ))}
        </div>
    );
}

export default Posts;
