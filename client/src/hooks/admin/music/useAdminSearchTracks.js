import { useState } from 'react';
import musicAdminApi from '~/api/admin/musicAdminApi';

const useAdminSearchTracks = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchTracks = async (query, limit) => {
        setLoading(true);
        setError(null);

        try {
            const res = await musicAdminApi.searchTracks(query, limit);
            return res.data;
        } catch (err) {
            // toast.error(err.response.message);
            setError(err);
            return err;
        } finally {
            setLoading(false);
        }
    };

    return { searchTracks, loading, error };
};

export default useAdminSearchTracks;
