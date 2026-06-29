// hooks/post/useCreatePost.js
import { useState } from 'react';
import { toast } from 'react-toastify';
import roomApi from '~/api/coListening/roomApi';
import { CoListeningRoom } from '~/types/coListeningRoom';

const useCreateRoom = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createRoom = async (roomData: any) => {
        setLoading(true);
        setError(null);

        try {
            const post = await roomApi.createRoom(roomData);
            return post.data.data;
        } catch (err: any) {
            const message = err?.response?.data?.message || 'Failed to post!';
            toast.error(message);
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { createRoom, loading, error };
};

export default useCreateRoom;
