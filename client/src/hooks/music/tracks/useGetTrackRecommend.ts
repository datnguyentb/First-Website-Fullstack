import { useEffect, useState } from 'react';
import musicPlayerApi from '~/api/music/musicPlayerApi';
import { Track } from '~/types';

export default function useGetTrackRecommend() {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchStatus = async () => {
            try {
                const res = await musicPlayerApi.getTracksRecomend();
                setTracks(res.data.data);
            } catch (err: any) {
                setError(err.response);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, []);

    return { tracks, setTracks, loading, error };
}
