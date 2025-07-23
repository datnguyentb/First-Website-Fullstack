import { useEffect, useState } from 'react';
import postApi from '~/api/postApi';

export default function useFetchPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const res = await postApi.getPostAll();
                setPosts(res.data?.data || []);
            } catch (error) {
                console.error('Lỗi tải bài viết:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return { posts, loading, error, setPosts };
}
