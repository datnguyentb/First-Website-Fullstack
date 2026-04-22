import { useEffect, useState } from 'react';
import musicPlayerApi from '~/api/music/musicPlayerApi';

export default function useGetMyPlaylists() {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true; // Cờ kiểm tra component còn tồn tại không

        const getPlaylists = async () => {
            setLoading(true);
            try {
                const res = await musicPlayerApi.getMyPlaylists();
                if (isMounted) {
                    setPlaylists(res.data.data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.response);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        getPlaylists();

        return () => {
            isMounted = false;
        };
    }, []);

    return { playlists, setPlaylists, loading, error };
}
