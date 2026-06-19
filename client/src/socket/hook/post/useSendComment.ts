import { useSocketContext } from '~/contexts';

export default function useSendComment() {
    const { socket } = useSocketContext();

    const sendComment = (postId: string, commentData: { content: string; parentCommentId?: string }) => {
        if (!socket) {
            console.error('Socket chưa được kết nối.');
            return;
        }

        socket.emit('sendComment', postId, commentData);
    };

    return { sendComment };
}
