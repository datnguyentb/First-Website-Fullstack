import { useState } from 'react';
import { toast } from 'react-toastify';
import postAdminApi from '~/api/admin/postAdminApi';

export default function useDeleteForever() {
    const [loading, setLoading] = useState(false);
    const deleteForeverPost = async (postId) => {
        setLoading(true);

        try {
            const response = await postAdminApi.forceDelete(postId);
            toast.success('Post permanently deleted successfully!');
            return response.data;
        } catch (err) {
            toast.error('Failed to permanently delete the post!');
            return err;
        } finally {
            setLoading(false);
        }
    };

    return { deleteForeverPost, loading };
}
