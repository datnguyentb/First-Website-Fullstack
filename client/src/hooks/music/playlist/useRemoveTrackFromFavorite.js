import { useState } from 'react';
import musicPlayerApi from '~/api/music/musicPlayerApi';
import { toast } from 'react-toastify';

export default function useRemoveTrackFromFavorite() {
    const [loading, setLoading] = useState(false);

    const removeTrackFromFavorite = async (id) => {
        setLoading(true);

        try {
            const res = await musicPlayerApi.removeTrackFromFavorite(id);
            return res.data;
        } catch (err) {
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { removeTrackFromFavorite, loading };
}
