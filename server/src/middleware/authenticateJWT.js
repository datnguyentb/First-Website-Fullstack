import { verifyToken } from '../utils/jwt.js';
import User from '../models/User.js';
import { unauthorizedResponse, forbiddenResponse } from '../utils/responseHelper.js';

export const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return unauthorizedResponse(res, 'Unauthorized: Missing token');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded._id);

        if (!user) {
            return unauthorizedResponse(res, 'Unauthorized: User not found');
        }

        if (user.lockedAt) {
            return forbiddenResponse(res, 'Access denied: Your account is locked');
        }

        req.user = user;
        next();
    } catch (err) {
        //Khi xác nhận token thất bại (hết hạn, không hợp lệ,...)
        return unauthorizedResponse(res, 'Unauthorized: Invalid or expired token');
    }
};
