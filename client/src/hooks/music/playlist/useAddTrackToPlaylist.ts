import { useState } from 'react';
import musicPlayerApi from '~/api/music/musicPlayerApi';

export default function useAddTrackToPlaylist() {
    const [loading, setLoading] = useState(false);

    const addTrackToPlaylist = async (playlistId: string, songId: string) => {
        setLoading(true);

        try {
            const res = await musicPlayerApi.addTrackToPlaylist(playlistId, songId);
            return res.data;
        } catch (err: any) {
            return err.response;
        } finally {
            setLoading(false);
        }
    };

    return { addTrackToPlaylist, loading };
}
