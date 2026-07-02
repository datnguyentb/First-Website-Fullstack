import { getIO } from '../io.js';

export const socketEmitter = (receiverIds, event, socketEvent, data, meta = {}) => {
    const io = getIO();

    if (!io) {
        throw new Error('Socket.IO has not been initialized.');
    }

    const targets = Array.isArray(receiverIds) ? receiverIds : [receiverIds];

    const payload = {
        event,
        data,
        meta,
        timestamp: new Date(),
    };

    targets.forEach((id) => {
        io.to(id.toString()).emit(socketEvent, payload);
    });
};
