import { useState, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { usePlaylistContext } from '~/contexts';
import { useImagePreview } from '~/hooks/imagePreview/useImagePreview';
import useCreatePlaylist from '~/hooks/music/playlist/useCreatePlaylist';

export interface PlaylistFormData {
    playlistAvatar: File | null;
    playlistName: string;
    playlistDescription: string;
    isPublic: boolean;
}

interface UseCreatePlaylistFormProps {
    setShowCreatePlaylist: (show: boolean) => void;
}

export default function useCreatePlaylistForm({ setShowCreatePlaylist }: UseCreatePlaylistFormProps) {
    const { setPlaylists } = usePlaylistContext();

    const { createPlaylist } = useCreatePlaylist();

    const [formData, setFormData] = useState<PlaylistFormData>({
        playlistAvatar: null,
        playlistName: '',
        playlistDescription: '',
        isPublic: true,
    });

    const preview = useImagePreview(formData.playlistAvatar);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;
        setFormData((prev) => ({ ...prev, playlistAvatar: selectedFile }));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePrivacyChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, isPublic: e.target.checked }));
    };

    const handleSubmit = async () => {
        if (!formData.playlistName.trim()) {
            toast.error('Playlist name cannot be empty');
            return;
        }
        const res = await createPlaylist(formData);

        if (res?.success) {
            toast.success(res?.message || 'Success');
            setShowCreatePlaylist(false);
            setPlaylists((prev) => [res.data, ...prev]);
        } else {
            toast.error(res?.message || 'Something went wrong');
        }
    };

    return {
        formData,
        preview,
        handleChange,
        handleImageChange,
        handlePrivacyChange,
        handleSubmit,
    };
}
