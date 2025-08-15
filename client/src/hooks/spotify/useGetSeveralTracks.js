import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import spotifyApi from '~/api/spotify/spotifyApi';
import { joinIds } from '~/helper/joinIds';

const useGetSeveralTracks = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getSeveralTracks = async (listId) => {
        setLoading(true);
        setError(null);

        try {
            if (!Array.isArray(listId)) {
                throw new Error('listId phải là một mảng');
            }

            const limitedList = joinIds(listId.slice(0, 50));
            const res = await spotifyApi.getSeveralTracks(limitedList);
            return res.data;
        } catch (err) {
            toast.error(err.response?.message || err.message);
            setError(err);
            return err;
        } finally {
            setLoading(false);
        }
    };

    return { getSeveralTracks, loading, error };
};

export default useGetSeveralTracks;
