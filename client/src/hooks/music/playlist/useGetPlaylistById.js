import { useEffect, useState } from 'react';
import musicPlayerApi from '~/api/music/musicPlayerApi';

export default function useGetPlaylistById(id) {
    const [playlistList, setPlaylistList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const getPlaylists = async () => {
            try {
                const res = await musicPlayerApi.getPlaylistById(id);
                setPlaylistList(res.data.data);
            } catch (err) {
                setError(err.response);
            } finally {
                setLoading(false);
            }
        };

        getPlaylists();
    }, [id]);

    return { playlistList, setPlaylistList, loading, error };
}
