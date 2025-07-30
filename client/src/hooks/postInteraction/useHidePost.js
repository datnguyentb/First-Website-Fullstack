// hooks/post/useHidePost.js
import { useState } from 'react';
import { toast } from 'react-toastify';
import postInteractionApi from '~/api/user/postInteractionApi';

const useHidePost = () => {
    const [loading, setLoading] = useState(false);

    const hidePost = async (post_id) => {
        setLoading(true);

        try {
            const res = await postInteractionApi.hidePost(post_id);
            toast.success(res.data.message);
            return res;
        } catch (error) {
            toast.error(error.response.data.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { hidePost, loading };
};

export default useHidePost;
