// hooks/post/useCreatePost.js
import { useState } from 'react';
import { toast } from 'react-toastify';
import postApi from '~/api/user/postApi';

const useCreatePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createPost = async (form) => {
        setLoading(true);
        setError(null);

        try {
            const post = await postApi.creatPost(form);
            return post.data.data;
        } catch (err) {
            const message = err?.response?.data?.message || 'Lỗi khi đăng bài!';
            toast.error(message);
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { createPost, loading, error };
};

export default useCreatePost;
