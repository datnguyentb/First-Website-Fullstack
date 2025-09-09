// context/PlaylistContext.js
import { createContext } from 'react';
import useGetMyPlaylists from '~/hooks/music/playlist/useGetMyPlaylists';

export const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
    const { playlists, setPlaylists, loading, error } = useGetMyPlaylists();

    return (
        <PlaylistContext.Provider value={{ playlists, setPlaylists, loading, error }}>
            {children}
        </PlaylistContext.Provider>
    );
};
