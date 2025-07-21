import { createContext, useState, useEffect } from 'react';
import postApi from '~/api/postApi';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const res = await postApi.getPostAll();
                setPosts(res.data.data); // Tùy vào response từ backend
            } catch (error) {
                console.error('Lỗi tải bài viết:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return <PostContext.Provider value={{ posts, setPosts, loading }}>{children}</PostContext.Provider>;
};
