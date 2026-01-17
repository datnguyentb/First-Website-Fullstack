import { useState } from 'react';
import postAdminApi from '~/api/admin/postAdminApi';

export default function useRestorePost() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const restorePost = async (postId: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await postAdminApi.restorePost(postId);
            return response.data;
        } catch (err: any) {
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { restorePost, loading, error };
}
