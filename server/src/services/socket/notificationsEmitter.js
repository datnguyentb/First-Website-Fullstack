import { SOCKET_PAYLOAD_TYPES } from '../../constants/socketTypes.js';
import { emitRealtimeEvent } from '../socketEmitter.js';

export const notificationsEmitter = (receiverIds, data) => {
    emitRealtimeEvent(receiverIds, SOCKET_PAYLOAD_TYPES.NOTIFICATION, data);
};
