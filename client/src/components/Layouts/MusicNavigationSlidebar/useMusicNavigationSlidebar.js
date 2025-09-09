// hooks/useMusicNavigationSlidebar.js
import { useState } from 'react';
import useGetMyPlaylists from '~/hooks/music/playlist/useGetMyPlaylists';

export default function useMusicNavigationSlidebar() {
    const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

    const handleCreatePlaylist = () => setShowCreatePlaylist(true);
    const handleCloseCreatePlaylist = () => setShowCreatePlaylist(false);

    return {
        showCreatePlaylist,
        setShowCreatePlaylist,
        handleCreatePlaylist,
        handleCloseCreatePlaylist,
    };
}
