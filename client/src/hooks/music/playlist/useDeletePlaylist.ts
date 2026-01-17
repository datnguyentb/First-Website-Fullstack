import { useState } from 'react';
import musicPlayerApi from '~/api/music/musicPlayerApi';

export default function useDeletePlaylist() {
    const [loading, setLoading] = useState(false);

    const deletePlaylist = async (id: string) => {
        setLoading(true);

        try {
            const res = await musicPlayerApi.deletePlaylist(id);
            return res.data;
        } catch (err: any) {
            return err.response.data;
        } finally {
            setLoading(false);
        }
    };

    return { deletePlaylist, loading };
}
