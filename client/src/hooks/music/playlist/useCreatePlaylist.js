import { useState } from 'react';
import musicPlayerApi from '~/api/music/musicPlayerApi';
import { toast } from 'react-toastify';

export default function useCreatePlaylist() {
    const [loading, setLoading] = useState(false);

    const createPlaylist = async (data) => {
        setLoading(true);

        try {
            const res = await musicPlayerApi.createPlaylist(data);
            return res.data;
        } catch (err) {
            toast.error('Failed to create playlist!');
            return err.response;
        } finally {
            setLoading(false);
        }
    };

    return { createPlaylist, loading };
}
