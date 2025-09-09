import { useState } from 'react';
import musicPlayerApi from '~/api/music/musicPlayerApi';

const useSearchEntities = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchEntities = async (query, limit) => {
        setLoading(true);
        setError(null);

        try {
            const res = await musicPlayerApi.searchEntities(query, limit);
            return res.data;
        } catch (err) {
            setError(err);
            return err;
        } finally {
            setLoading(false);
        }
    };

    return { searchEntities, loading, error };
};

export default useSearchEntities;
