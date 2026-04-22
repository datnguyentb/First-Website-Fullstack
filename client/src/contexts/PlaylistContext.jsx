// context/PlaylistContext.js
import { createContext, useMemo } from 'react';
import useGetMyPlaylists from '~/hooks/music/playlist/useGetMyPlaylists';

export const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
    const { playlists, setPlaylists, loading, error } = useGetMyPlaylists();

    const contextValue = useMemo(
        () => ({
            playlists,
            setPlaylists,
            loading,
            error,
        }),
        [playlists, loading, error, setPlaylists],
    );

    return <PlaylistContext.Provider value={contextValue}>{children}</PlaylistContext.Provider>;
};
