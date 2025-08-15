import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import spotifyApi from '~/api/spotify/spotifyApi';

const useSearch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchApi = async (query, type, limit) => {
        setLoading(true);
        setError(null);

        try {
            const res = await spotifyApi.searchSpotify(query, type, limit);
            return res;
        } catch (err) {
            toast.error(err.response.message);
            setError(err);
            return err;
        } finally {
            setLoading(false);
        }
    };

    return { searchApi, loading, error };
};

export default useSearch;
