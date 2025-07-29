import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { unauthorizedResponse, forbiddenResponse } from '../utils/responseHelper.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return unauthorizedResponse(res, 'Unauthorized: Missing token');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return unauthorizedResponse(res, 'Unauthorized: User not found');
        }

        if (user.lockedAt) {
            return forbiddenResponse(res, 'Access denied: Your account is locked');
        }

        req.user = user;
        next();
    } catch (err) {
        return unauthorizedResponse(res, 'Unauthorized: Invalid or expired token');
    }
};
