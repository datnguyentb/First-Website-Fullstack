import { useEffect, useState } from 'react';
import musicPlayerApi from '~/api/music/musicPlayerApi';

export default function useGetFavoritePlaylist() {
    const [favoriteTrackIds, setFavoriteTrackIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const getPlaylists = async () => {
            try {
                const res = await musicPlayerApi.getFavoritePlaylistIds();
                console.log(res.data.data);
                setFavoriteTrackIds(res.data.data);
            } catch (err) {
                setError(err.response);
            } finally {
                setLoading(false);
            }
        };

        getPlaylists();
    }, []);

    return { favoriteTrackIds, setFavoriteTrackIds, loading, error };
}
