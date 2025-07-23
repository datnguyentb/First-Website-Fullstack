import { useEffect, useState } from 'react';
import postAdminApi from '~/api/admin/postAdminApi';

export default function useFetchPostsNumber() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [postsCount, setPostsCount] = useState(null);
    const [postsReportedCount, SetPostsReportedCount] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const res = await postAdminApi.getPostsNumber();
                setPostsCount(res.data.data.totalPosts);
                SetPostsReportedCount(res.data.data.reportedPosts);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { postsCount, postsReportedCount, loading, error };
}
