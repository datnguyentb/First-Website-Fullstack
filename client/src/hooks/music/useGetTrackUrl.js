// hooks/post/useCreatePost.js
import { useState } from 'react';
import musicPlayerApi from '~/api/music/musicPlayerApi';

const useGetTrackUrl = () => {
    const [loading, setLoading] = useState(false);

    const getTrackUrl = async (trackId) => {
        setLoading(true);

        try {
            const res = await musicPlayerApi.getTrackUrlById(trackId);
            return res.data.data.url;
        } catch (err) {
            return err.response;
        } finally {
            setLoading(false);
        }
    };

    return { getTrackUrl, loading };
};

export default useGetTrackUrl;
