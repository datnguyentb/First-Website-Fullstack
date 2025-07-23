import { createContext } from 'react';
import useFetchPosts from '~/hooks/post/useFetchPosts';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const { posts, loading, setPosts } = useFetchPosts();

    return <PostContext.Provider value={{ posts, setPosts, loading }}>{children}</PostContext.Provider>;
};
