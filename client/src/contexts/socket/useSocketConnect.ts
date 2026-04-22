import { useEffect } from 'react';
import { connectSocket, disconnectSocket } from '../../socket/socket.js';
import { SOCKET_EVENTS } from './socketTypes';

export const useSocketConnect = (dispatch: any) => {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const socket = connectSocket(token);

        dispatch({
            type: SOCKET_EVENTS.SET_SOCKET,
            payload: socket,
        });

        return () => {
            disconnectSocket();
            dispatch({
                type: SOCKET_EVENTS.SET_SOCKET,
                payload: null,
            });
        };
    }, [dispatch]);
};
