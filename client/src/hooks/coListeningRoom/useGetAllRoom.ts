// hooks/post/useCreatePost.js
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import roomApi from '~/api/coListening/roomApi';
import { CoListeningRoom } from '~/types/coListeningRoom';

const useGetAllRoom = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAllRoom = async () => {
        setLoading(true);
        setError(null);

        try {
            const Rooms = await roomApi.getAllRoom();
            return Rooms.data.data;
        } catch (err: any) {
            const message = err?.response?.data?.message || 'Failed to get!';
            toast.error(message);
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { getAllRoom, loading, error };
};

export default useGetAllRoom;
