import messageService from '../../../services/messageService.js';

const messageHandler = (socket) => {
    const userId = socket.user._id;

    socket.on('send-message', async (data) => {
        try {
            await messageService.sendMessage(data, socket.user._id);
        } catch (err) {
            socket.emit('message-error', err.message);
        }
    });
};

export default messageHandler;
