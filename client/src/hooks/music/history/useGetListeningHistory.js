import { useState } from 'react';
import musicPlayerApi from '~/api/music/musicPlayerApi';

const useGetListeningHistory = () => {
    const [loading, setLoading] = useState(false);

    const getListeningHistory = async () => {
        setLoading(true);

        try {
            const res = await musicPlayerApi.getListeningHistory();
            return res.data.data;
        } catch (err) {
            return err.response;
        } finally {
            setLoading(false);
        }
    };

    return { getListeningHistory, loading };
};

export default useGetListeningHistory;
