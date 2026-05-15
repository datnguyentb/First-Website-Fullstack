import { emitRealtimeEvent } from '../socketEmitter.js';

export const emitFormatter = (io, event, receiverIds, type, data, meta) => {
    receiverIds.forEach((receiverId) => {
        emitRealtimeEvent(io, receiverId, event, type, {
            event,
            data: {
                type,
                ...data,
            },
            meta,
            timestamp: new Date(),
        });
    });
};
