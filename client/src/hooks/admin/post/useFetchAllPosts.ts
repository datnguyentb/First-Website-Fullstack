import { useEffect, useState } from 'react';
import postAdminApi from '~/api/admin/postAdminApi';
import { Post } from '~/types/post';

export default function useFetchAllPosts() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const res = await postAdminApi.getAllPost();
                setPosts(res.data.data);
            } catch (err: any) {
                console.log(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { posts, setPosts, loading, error };
}
