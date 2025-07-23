import { useEffect, useState } from 'react';
import postAdminApi from '~/api/admin/postAdminApi';

export default function useFetchAllPosts() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const res = await postAdminApi.getAllPost();
                setPosts(res.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { posts, loading, error };
}
