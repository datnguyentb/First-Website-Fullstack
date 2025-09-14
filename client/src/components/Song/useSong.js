import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useFavoriteContext, usePlayerContext, usePlaylistContext } from '~/contexts';
import useAddTrackToPlaylist from '~/hooks/music/playlist/useAddTrackToPlaylist';
import useDeleteTrackFromPlaylist from '~/hooks/music/playlist/useDeleteTrackFromPlaylist';

export function useSong(data) {
    //UseContext
    const { playlists, setPlaylists } = usePlaylistContext();
    const { likeSong, unlikeSong, isLiked } = useFavoriteContext();
    const { addTrackToPlaylist } = useAddTrackToPlaylist();
    const { deleteTrackToPlaylist } = useDeleteTrackFromPlaylist();

    const { playSong, currentSong, setQueue, isPlaying, currentIndex } = usePlayerContext();

    //useState
    const [visible, setVisible] = useState(false);

    //Handle xử lý
    const handleAddToPlaylist = async (playlistId, songId) => {
        const res = await addTrackToPlaylist(playlistId, songId);

        if (res?.success) {
            setPlaylists((prev) =>
                prev.map((pl) => (pl._id === playlistId ? { ...pl, trackIds: [...pl.trackIds, songId] } : pl)),
            );
            toast.success(res.message);
        } else {
            toast.error(res.data.message);
        }
        setVisible(false);
    };

    const handleRemoveTrackFromPlaylist = async (playlistId, songId) => {
        const res = await deleteTrackToPlaylist(playlistId, songId);

        if (res?.success) {
            setPlaylists((prev) =>
                prev.map((pl) =>
                    pl._id === playlistId ? { ...pl, trackIds: pl.trackIds.filter((id) => id !== songId) } : pl,
                ),
            );
            toast.success(res.message);
        } else {
            toast.error(res.data?.message || 'Có lỗi xảy ra');
        }

        setVisible(false);
    };

    // Click vào Name
    const handleOnClickName = () => {
        console.log('Album Id: ', data.album._id);
    };

    //Click vào artirst
    const handleOnClickArtists = (e, artistsId) => {
        console.log('Artists Id', artistsId);
    };

    //Click to add to playlist
    const handleAddToLibrary = () => {
        likeSong(data._id);
    };

    const handleRemoveFromLibrary = () => {
        unlikeSong(data._id);
    };

    //Handle Add to Queue
    const handleAddToQueue = () => {
        setQueue((prevQueue) => [...prevQueue, data]);
    };

    //Handle Add to Play Next
    const handlePlayNext = () => {
        setQueue((prevQueue) => {
            const newQueue = [...prevQueue];
            newQueue.splice(currentIndex + 1, 0, data);
            return newQueue;
        });
    };

    return {
        playSong,
        currentSong,
        playlists,
        isPlaying,
        isLiked,
        likeSong,
        unlikeSong,
        visible,
        setVisible,
        handleAddToLibrary,
        handleRemoveFromLibrary,
        handleAddToPlaylist,
        handleRemoveTrackFromPlaylist,
        handleAddToQueue,
        handlePlayNext,
        handleOnClickName,
        handleOnClickArtists,
    };
}
