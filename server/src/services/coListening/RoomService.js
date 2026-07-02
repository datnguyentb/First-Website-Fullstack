import { RoomModel } from '../../models/Room.js';
import { pickRoomFields, pickRoomsFields, pickRoomSmallFiels } from '../../utils/mappers/room.mapper.js';

const createRoom = async (newRoomData) => {
    try {
        const newRoom = new RoomModel(newRoomData);
        await newRoom.save();
        return pickRoomSmallFiels(newRoom.toObject());
    } catch (error) {
        console.error('Error creating Room:', error);
        throw error;
    }
};

export const getAllRoom = async () => {
    try {
        const allRooms = await RoomModel.find({ isActive: true })
            .populate('hostId', 'firstName lastName')
            .populate('currentTrack')
            .sort({ createdAt: -1 });

        return pickRoomsFields(allRooms);
    } catch (error) {
        console.error('Error get Rooms:', error);
        throw error;
    }
};

export default {
    createRoom,
    getAllRoom,
};
