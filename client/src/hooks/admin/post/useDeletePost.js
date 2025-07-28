import { useState } from 'react';
import { toast } from 'react-toastify';
import postAdminApi from '~/api/admin/postAdminApi';

export default function useDeletePost() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deletePost = async (postId, reason) => {
        setLoading(true);
        setError(null);

        try {
            const response = await postAdminApi.softDelete(postId, reason);
            toast.success('Post deleted successfully!');
            return response.data.data;
        } catch (err) {
            toast.error('Failed to delete the post!');
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { deletePost, loading, error };
}
