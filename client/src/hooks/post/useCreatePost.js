// hooks/post/useCreatePost.js
import { useState } from 'react';
import { toast } from 'react-toastify';
import postApi from '~/api/postApi';

const useCreatePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createPost = async (form) => {
        setLoading(true);
        setError(null);

        try {
            const post = await postApi.creatPost(form);
            return post.data.data; // ✅ return dữ liệu
        } catch (err) {
            toast.error('Lỗi khi đăng bài!');
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { createPost, loading, error };
};

export default useCreatePost;
