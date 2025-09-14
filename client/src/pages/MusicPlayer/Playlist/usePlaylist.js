import { useParams } from 'react-router-dom';
import { usePlayerContext } from '~/contexts';
import useGetPlaylistById from '~/hooks/music/playlist/useGetPlaylistById';

export function usePlaylist() {
    const { id } = useParams();
    const { playlistList, loading } = useGetPlaylistById(id);
    const { setCurrentIndex, setPlaylist, playSong } = usePlayerContext();

    const handleClickPlay = (index, song) => {
        if (playlistList.tracks.length == 0) {
            return;
        }

        const tracksArray = playlistList.tracks.map((item) => ({
            ...item.track,
        }));
        setPlaylist((prev) => {
            const isSame = prev.length === tracksArray.length && prev.every((t, i) => t._id === tracksArray[i]._id);
            return isSame ? prev : tracksArray;
        });

        setCurrentIndex(index);
        playSong(song);
    };
    return {
        loading,
        playlistList,
        handleClickPlay,
    };
}
