// hooks/post/useCreatePost.js
import { useState } from 'react';
import { toast } from 'react-toastify';
import postApi from '~/api/user/postApi';

const useDeletePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deletePost = async (post_id) => {
        setLoading(true);
        setError(null);

        try {
            const res = await postApi.deletePost(post_id);
            toast.success(res.data.message);
            return res.data;
        } catch (err) {
            toast.error(err.response.message);
            setError(err);
            return err.response;
        } finally {
            setLoading(false);
        }
    };

    return { deletePost, loading, error };
};

export default useDeletePost;
