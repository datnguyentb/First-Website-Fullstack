// hooks/post/useCreatePost.js
import { useState } from 'react';
import { toast } from 'react-toastify';
import postApi from '~/api/user/postApi';
import { Post } from '~/types/post';

const useCreatePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createPost = async (form: FormData) => {
        setLoading(true);
        setError(null);

        try {
            const post = await postApi.creatPost(form);
            return post.data.data as Post;
        } catch (err: any) {
            const message = err?.response?.data?.message || 'Failed to post!';
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
