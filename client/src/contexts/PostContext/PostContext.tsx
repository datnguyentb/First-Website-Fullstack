import { createContext, ReactNode } from 'react';
import useFetchPosts from '~/hooks/post/useFetchPosts';
import { PostContextType } from './PostContextType';

export const PostContext = createContext<PostContextType | {}>({});

export const PostProvider = ({ children }: { children: ReactNode }) => {
    const { posts, loading, setPosts } = useFetchPosts();

    return <PostContext.Provider value={{ posts, setPosts, loading }}>{children}</PostContext.Provider>;
};
