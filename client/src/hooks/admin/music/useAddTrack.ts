import { useState } from 'react';
import musicAdminApi from '~/api/admin/musicAdminApi';

const useAddTrack = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const addTrack = async (id: string) => {
        setLoading(true);
        try {
            const res = await musicAdminApi.addTrack(id);
            return res.data;
        } catch (err: any) {
            return err.response;
        } finally {
            setLoading(false);
        }
    };

    return { addTrack, loading };
};

export default useAddTrack;
