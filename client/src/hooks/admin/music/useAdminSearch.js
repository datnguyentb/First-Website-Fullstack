import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import musicAdminApi from '~/api/admin/musicAdminApi';

const useAdminSearch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchApi = async (query, type, limit) => {
        setLoading(true);
        setError(null);

        try {
            const res = await musicAdminApi.searchSpotify(query, type, limit);
            return res.data;
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

export default useAdminSearch;
