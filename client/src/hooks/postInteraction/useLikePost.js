// hooks/post/useCreatePost.js
import { useState } from 'react';
import { toast } from 'react-toastify';
import postInteractionApi from '~/api/user/postInteractionApi';

const useLikePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const likePost = async (post_id) => {
        setLoading(true);
        setError(null);

        try {
            const post = await postInteractionApi.likePost(post_id);
            return post.data.data;
        } catch (err) {
            toast.error(err.response.message);
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { likePost, loading, error };
};

export default useLikePost;
