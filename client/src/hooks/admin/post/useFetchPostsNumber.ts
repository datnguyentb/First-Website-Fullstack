import { useEffect, useState } from 'react';
import postAdminApi from '~/api/admin/postAdminApi';

export default function useFetchPostsNumber() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);
    const [postsCount, setPostsCount] = useState<number>(0);
    const [postsReportedCount, SetPostsReportedCount] = useState<number>(0);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const res = await postAdminApi.getPostsNumber();
                setPostsCount(res.data.data.totalPosts);
                SetPostsReportedCount(res.data.data.reportedPosts);
            } catch (err: any) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { postsCount, postsReportedCount, loading, error };
}
