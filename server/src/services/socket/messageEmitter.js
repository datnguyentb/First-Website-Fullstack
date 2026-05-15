import { SOCKET_PAYLOAD_TYPES } from '../../constants/socketTypes.js';
import { emitRealtimeEvent } from '../socketEmitter.js';

export const messageEmitter = (receiverIds, data) => {
    emitRealtimeEvent(receiverIds, SOCKET_PAYLOAD_TYPES.MESSAGE, data);
};
