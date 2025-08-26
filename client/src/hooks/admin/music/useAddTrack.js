import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import musicAdminApi from '~/api/admin/musicAdminApi';

const useAddTrack = () => {
    const [loading, setLoading] = useState(false);

    const addTrack = async (id) => {
        setLoading(true);
        try {
            const res = await musicAdminApi.addTrack(id);
            return res.data;
        } catch (err) {
            return err.response;
        } finally {
            setLoading(false);
        }
    };

    return { addTrack, loading };
};

export default useAddTrack;
