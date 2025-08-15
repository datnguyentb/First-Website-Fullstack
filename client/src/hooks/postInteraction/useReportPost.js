// hooks/post/useCreatePost.js
import { useState } from 'react';
import { toast } from 'react-toastify';
import postInteractionApi from '~/api/user/postInteractionApi';

const useReportPost = () => {
    const [loading, setLoading] = useState(false);

    const reportPost = async (postId, reason) => {
        setLoading(true);

        try {
            const res = await postInteractionApi.reportPost(postId, reason);
            toast.success(res.data.message);
            return res;
        } catch (error) {
            toast.error(error.response.data.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { reportPost, loading };
};

export default useReportPost;
