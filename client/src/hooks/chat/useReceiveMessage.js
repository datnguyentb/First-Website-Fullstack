import { useEffect, useState } from 'react';
import { useSocketContext } from '~/contexts';

export default function useReceiveMessage() {
    const [lastMessage, setLastMessage] = useState(null); // chỉ lưu message mới
    const { socket } = useSocketContext();

    useEffect(() => {
        if (!socket) return;

        const handler = (message) => {
            setLastMessage(message); // nhận tất cả message từ server
        };

        socket.on('receiveMessage', handler);

        return () => {
            socket.off('receiveMessage', handler);
        };
    }, [socket]);

    return lastMessage;
}
