import { useEffect, useState } from 'react';
import musicPlayerApi from '~/api/music/musicPlayerApi';

export default function useGetListeningHistory() {
    const [historyList, setHistoryList] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchStatus = async () => {
            try {
                const res = await musicPlayerApi.getListeningHistory();
                setHistoryList(res.data.data);
            } catch (err) {
                setError(err.response);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, []);

    return { historyList, setHistoryList, loading, error };
}
