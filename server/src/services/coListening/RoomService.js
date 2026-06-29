import { RoomModel } from '../../models/Room.js';
import { pickRoomFields } from '../../utils/mappers/room.mapper.js';

const createRoom = async (newRoomData) => {
    try {
        const newRoom = new RoomModel(newRoomData);
        await newRoom.save();
        return pickRoomFields(newRoom.toObject());
    } catch (error) {
        console.error('Error creating Room:', error);
        throw error;
    }
};

export default {
    createRoom,
};
