import { useState } from 'react';
import { toast } from 'react-toastify';
import musicAdminApi from '~/api/admin/musicAdminApi';

const useDeleteTrackAndPlaylist = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteTrackAndPlaylist = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const res = await musicAdminApi.deleteTrackAndPlaylist(id);
            return res.data;
        } catch (err) {
            setError(err);
            return err.response.data;
        } finally {
            setLoading(false);
        }
    };

    return { deleteTrackAndPlaylist, loading, error };
};

export default useDeleteTrackAndPlaylist;
