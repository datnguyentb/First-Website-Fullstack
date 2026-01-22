import { useEffect, useState } from 'react';
import postApi from '~/api/user/postApi';
import { Post as PostData } from '~/types';

export default function useFetchPosts() {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const res = await postApi.getPostAll();
                setPosts(res.data?.data || []);
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return { posts, loading, error, setPosts };
}
