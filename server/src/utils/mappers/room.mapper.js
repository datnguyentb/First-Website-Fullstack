export const pickRoomFields = (room) => ({
    _id: room._id,
    name: room.name,
    slug: room.slug,
    roomMode: room.roomMode,
    playbackMode: room.playbackMode,
    host: room.hostId,
    currentTrack: room.currentTrack,
    isPlaying: room.isPlaying,
    currentTime: room.currentTime,
});
