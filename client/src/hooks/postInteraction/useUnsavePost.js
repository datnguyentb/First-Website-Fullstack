// hooks/post/useCreatePost.js
import { useState } from 'react';
import { toast } from 'react-toastify';
import postInteractionApi from '~/api/user/postInteractionApi';

const useUnsavePost = () => {
    const [loading, setLoading] = useState(false);

    const unsavePost = async (postId) => {
        setLoading(true);

        try {
            const res = await postInteractionApi.unsavePost(postId);
            toast.success(res.data.message);
            return res;
        } catch (error) {
            toast.error(error.response.data.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { unsavePost, loading };
};

export default useUnsavePost;
