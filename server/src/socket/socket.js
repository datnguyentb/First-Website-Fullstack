let io;

export const initIO = (socketIO) => {
    io = socketIO;
};

export const getIO = () => {
    if (!io) {
        throw new Error('Socket.io chưa được khởi tạo');
    }

    return io;
};
