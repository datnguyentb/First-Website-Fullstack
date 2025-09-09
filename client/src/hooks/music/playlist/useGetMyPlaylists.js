import { useEffect, useState } from 'react';
import musicPlayerApi from '~/api/music/musicPlayerApi';

export default function useGetMyPlaylists() {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const getPlaylists = async () => {
            try {
                const res = await musicPlayerApi.getMyPlaylists();
                setPlaylists(res.data.data);
            } catch (err) {
                setError(err.response);
            } finally {
                setLoading(false);
            }
        };

        getPlaylists();
    }, []);

    return { playlists, setPlaylists, loading, error };
}
