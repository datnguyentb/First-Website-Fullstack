import { useState } from 'react';
import musicPlayerApi from '~/api/music/musicPlayerApi';

export default function useDeleteTrackFromPlaylist() {
    const [loading, setLoading] = useState(false);

    const deleteTrackToPlaylist = async (playlistId: string, songId: string) => {
        setLoading(true);

        try {
            const res = await musicPlayerApi.deleteTrackFromPlaylist(playlistId, songId);
            return res.data;
        } catch (err: any) {
            return err.response;
        } finally {
            setLoading(false);
        }
    };

    return { deleteTrackToPlaylist, loading };
}
