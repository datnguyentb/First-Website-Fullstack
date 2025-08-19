import { useEffect, useState } from 'react';
import musicAdminApi from '~/api/admin/musicAdminApi';

export default function useAdminGetAll() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState([]);

    useEffect(() => {
        setLoading(true);

        const fetchStatus = async () => {
            try {
                const res = await musicAdminApi.getTrackAndPlaylist();
                setResult(res.data.data);
            } catch (err) {
                setResult(err.response);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, []);

    return { result, setResult, loading };
}
