// hooks/post/useCreatePost.js
import { useState } from 'react';
import { toast } from 'react-toastify';
import postInteractionApi from '~/api/user/postInteractionApi';

const useSavePost = () => {
    const [loading, setLoading] = useState(false);

    const savePost = async (postId) => {
        setLoading(true);

        try {
            const res = await postInteractionApi.savePost(postId);
            toast.success(res.data.message);
            return res;
        } catch (error) {
            toast.error(error.response.data.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { savePost, loading };
};

export default useSavePost;
