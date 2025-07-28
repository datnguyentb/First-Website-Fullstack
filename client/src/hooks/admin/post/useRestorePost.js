import { useState } from 'react';
import { toast } from 'react-toastify';
import postAdminApi from '~/api/admin/postAdminApi';

export default function useRestorePost() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const restorePost = async (postId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await postAdminApi.restorePost(postId);
            toast.success('Post restored successfully!');
            return response.data.data;
        } catch (err) {
            toast.error('Failed to restore the post.');
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { restorePost, loading, error };
}
