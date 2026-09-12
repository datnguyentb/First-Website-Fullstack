import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

const SOCKET_URL = process.env.NODE_ENV === 'production' ? window.location.origin : 'http://localhost:5000';

export const connectSocket = (token: string): Socket | null => {
    if (!token) return null;

    if (socket) {
        socket.auth = { token };
        if (!socket.connected) {
            socket.connect();
        }
        return socket;
    }

    socket = io(SOCKET_URL, {
        auth: { token },
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
    });

    socket.on('connect', () => {});
    socket.on('disconnect', () => {});
    socket.on('connect_error', () => {});

    return socket;
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
