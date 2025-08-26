import { useState } from 'react';
import { toast } from 'react-toastify';
import musicAdminApi from '~/api/admin/musicAdminApi';

const useAdminDeleteTrack = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteTrack = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const res = await musicAdminApi.deleteTrack(id);
            return res.data;
        } catch (err) {
            setError(err);
            return err.response.data;
        } finally {
            setLoading(false);
        }
    };

    return { deleteTrack, loading, error };
};

export default useAdminDeleteTrack;
