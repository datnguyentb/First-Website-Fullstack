import { useEffect } from 'react';
import { useSocketContext } from '~/contexts';

export default function useJoinPostComments(postId: string) {
    const { socket } = useSocketContext();

    useEffect(() => {
        if (!socket || !postId) return;

        socket.emit('joinPostComments', postId);

        return () => {
            socket.emit('leavePostComments', postId);
        };
    }, [socket, postId]);
}
