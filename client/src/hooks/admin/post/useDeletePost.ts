import { useState } from 'react';
import postAdminApi from '~/api/admin/postAdminApi';

export default function useDeletePost() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deletePost = async (postId: string, reason: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await postAdminApi.softDelete(postId, reason);
            return response.data;
        } catch (err: any) {
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { deletePost, loading, error };
}
