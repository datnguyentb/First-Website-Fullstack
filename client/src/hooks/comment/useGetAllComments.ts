import { useEffect, useState } from 'react';
import commentApi from '~/api/post/commentApi';

export const useGetAllComments = (postId: string) => {
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            try {
                const res = await commentApi.getAllComments(postId);
                console.log('Comments fetched successfully:', res);
                setComments(res.data.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId]);

    return { loading, comments };
};
