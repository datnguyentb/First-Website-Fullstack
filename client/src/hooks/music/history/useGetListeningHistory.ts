import { useState } from 'react';
import musicPlayerApi from '~/api/music/musicPlayerApi';

const useGetListeningHistory = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const getListeningHistory = async () => {
        setLoading(true);

        try {
            const res = await musicPlayerApi.getListeningHistory();
            return res.data.data;
        } catch (err: any) {
            return err.response;
        } finally {
            setLoading(false);
        }
    };

    return { getListeningHistory, loading };
};

export default useGetListeningHistory;
