// hooks/post/useCreatePost.js
import { useState } from 'react';
import musicPlayerApi from '~/api/music/musicPlayerApi';

const useAddTrackToListeningHistory = () => {
    const [loading, setLoading] = useState(false);

    const addTrackToListeningHistory = async (trackId: string) => {
        setLoading(true);

        try {
            const res = await musicPlayerApi.addTrackToListeningHistory(trackId);
            return res.data;
        } catch (err: any) {
            return err.response;
        } finally {
            setLoading(false);
        }
    };

    return { addTrackToListeningHistory, loading };
};

export default useAddTrackToListeningHistory;
