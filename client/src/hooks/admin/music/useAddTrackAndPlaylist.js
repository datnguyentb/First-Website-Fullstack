import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import musicAdminApi from '~/api/admin/musicAdminApi';

const useAddTrackAndPlaylist = () => {
    const [loading, setLoading] = useState(false);

    const addTrackAndPlaylist = async (id, type, name, info) => {
        setLoading(true);
        try {
            const res = await musicAdminApi.addTrackAndPlaylist(id, type, name, info);
            return res.data;
        } catch (err) {
            return err.response;
        } finally {
            setLoading(false);
        }
    };

    return { addTrackAndPlaylist, loading };
};

export default useAddTrackAndPlaylist;
