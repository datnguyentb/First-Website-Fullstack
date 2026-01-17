import { useEffect, useState } from 'react';
import musicAdminApi from '~/api/admin/musicAdminApi';
import { AdminTrackResponse } from '~/types/track';

export default function useAdminGetAllTracks() {
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<AdminTrackResponse[]>([]);

    useEffect(() => {
        setLoading(true);

        const fetchStatus = async () => {
            try {
                const result = await musicAdminApi.getAllTracks();
                if (!result) return;
                setResult(result.data.data);
            } catch (err: any) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, []);

    return { result, setResult, loading };
}
