import { useState } from 'react';
import postAdminApi from '~/api/admin/postAdminApi';

export default function useDeleteForever() {
    const [loading, setLoading] = useState<boolean>(false);
    const deleteForeverPost = async (postId: string) => {
        setLoading(true);

        try {
            const response = await postAdminApi.forceDelete(postId);
            return response.data;
        } catch (err) {
            return err;
        } finally {
            setLoading(false);
        }
    };

    return { deleteForeverPost, loading };
}
