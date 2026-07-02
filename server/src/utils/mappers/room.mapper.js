// 1. Hàm dành cho MỘT phòng (Trả về ĐẦY ĐỦ các fields)
export const pickRoomFields = (room) => {
    if (!room) return null;

    return {
        _id: room._id,
        name: room.name,
        slug: room.slug,
        roomMode: room.roomMode,
        playbackMode: room.playbackMode,
        host: room.hostId,
        currentTrack: room.currentTrack,
        isPlaying: room.isPlaying,
        currentTime: room.currentTime,
        queue: room?.queue,
    };
};

// 2. Hàm dành cho NHIỀU phòng (Hàm "trừ" bớt fields, loại bỏ _id của host, isPlaying, currentTime)
export const pickRoomsFields = (rooms) => {
    if (!rooms || !Array.isArray(rooms)) return [];

    return rooms.map((room) => {
        let hostData = null;
        return pickRoomSmallFiels(room);
    });
};

export const pickRoomSmallFiels = (room) => {
    let hostData = null;
    if (room.hostId) {
        hostData = {
            firstName: room.hostId.firstName,
            lastName: room.hostId.lastName,
        };
    }
    return {
        _id: room._id,
        name: room.name,
        slug: room.slug,
        roomMode: room.roomMode,
        playbackMode: room.playbackMode,
        host: hostData,
        currentTrack: room.currentTrack,
    };
};
