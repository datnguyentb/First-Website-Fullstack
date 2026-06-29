import { useState } from 'react';
import musicPlayerApi from '~/api/music/musicPlayerApi';
import { toast } from 'react-toastify';

export default function useCreatePlaylist() {
    const [loading, setLoading] = useState(false);

    const createPlaylist = async (data) => {
        setLoading(true);
        if (!data.playlistName.trim()) return;
        const newPlaylistFormData = new FormData();
        // Xử lý avatar
        if (data.playlistAvatar) {
            newPlaylistFormData.append('playlistAvatar', data.playlistAvatar);
        }
        newPlaylistFormData.append('playlistName', data.playlistName);
        newPlaylistFormData.append('playlistDescription', data.playlistDescription);
        newPlaylistFormData.append('isPublic', String(data.isPublic));

        try {
            const res = await musicPlayerApi.createPlaylist(newPlaylistFormData);
            return res.data;
        } catch (err: any) {
            toast.error('Failed to create playlist!');
            return err.response;
        } finally {
            setLoading(false);
        }
    };

    return { createPlaylist, loading };
}
