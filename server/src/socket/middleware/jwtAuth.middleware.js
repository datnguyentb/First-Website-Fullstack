import { verifyToken } from '../../utils/jwt.js';

const jwtAuthMiddleware = (socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error('Authentication error'));
    }

    try {
        socket.user = verifyToken(token);
        next();
    } catch {
        next(new Error('Invalid token'));
    }
};

export default jwtAuthMiddleware;
