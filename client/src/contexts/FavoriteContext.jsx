import { createContext } from 'react';
import { toast } from 'react-toastify';
import useAddTrackToFavorite from '~/hooks/music/playlist/useAddTrackToFavorite';
import useGetFavoritePlaylist from '~/hooks/music/playlist/useGetFavoritePlaylist';
import useRemoveTrackFromFavorite from '~/hooks/music/playlist/useRemoveTrackFromFavorite';

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    // ✅ rõ ràng đây là mảng các trackId
    const { favoriteTrackIds, setFavoriteTrackIds } = useGetFavoritePlaylist();
    const { removeTrackFromFavorite } = useRemoveTrackFromFavorite();
    const { addTrackToFavorite } = useAddTrackToFavorite();

    const likeSong = async (id) => {
        try {
            const res = await addTrackToFavorite(id);
            if (res?.success) {
                setFavoriteTrackIds((prev) => [...prev, id]);
                toast.success('Like success');
            } else {
                toast.error(res?.message || 'Like failed');
            }
        } catch {
            toast.error('Something went wrong');
        }
    };

    const unlikeSong = async (id) => {
        try {
            const res = await removeTrackFromFavorite(id);
            if (res?.success) {
                setFavoriteTrackIds((prev) => prev.filter((trackId) => trackId !== id));
                toast.success('Unlike success');
            } else {
                toast.error(res?.message || 'Unlike failed');
            }
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong');
        }
    };

    const isLiked = (id) => Array.isArray(favoriteTrackIds) && favoriteTrackIds.includes(id);

    return (
        <FavoriteContext.Provider value={{ favoriteTrackIds, likeSong, unlikeSong, isLiked }}>
            {children}
        </FavoriteContext.Provider>
    );
};
