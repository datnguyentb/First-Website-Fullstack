import { SOCKET_PAYLOAD_TYPES } from '../../constants/socketTypes.js';
import { SOCKET_EVENTS } from '../constants/socketEvents.js';
import { socketEmitter } from './socketEmitter.js';

export const messageEmitter = (receiverIds, data) => {
    socketEmitter(receiverIds, SOCKET_PAYLOAD_TYPES.MESSAGE, SOCKET_EVENTS.REALTIME_EVENT, data);
};

export const notificationsEmitter = (receiverIds, data) => {
    socketEmitter(receiverIds, SOCKET_PAYLOAD_TYPES.NOTIFICATION, SOCKET_EVENTS.REALTIME_EVENT, data);
};
