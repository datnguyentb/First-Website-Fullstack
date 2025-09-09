import { useState } from 'react';
import musicPlayerApi from '~/api/music/musicPlayerApi';

export default function useAddTrackToFavorite() {
    const [loading, setLoading] = useState(false);

    const addTrackToFavorite = async (id) => {
        setLoading(true);

        try {
            const res = await musicPlayerApi.addTrackToFavorite(id);
            return res.data;
        } catch (err) {
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { addTrackToFavorite, loading };
}
