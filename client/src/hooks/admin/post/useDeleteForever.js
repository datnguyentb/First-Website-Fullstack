import { useState } from 'react';
import { toast } from 'react-toastify';
import postAdminApi from '~/api/admin/postAdminApi';

export default function useDeleteForever() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteForeverPost = async (postId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await postAdminApi.forceDelete(postId);
            toast.success('Post permanently deleted successfully!');
            return response.data.data;
        } catch (err) {
            toast.error('Failed to permanently delete the post!');
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { deleteForeverPost, loading, error };
}
