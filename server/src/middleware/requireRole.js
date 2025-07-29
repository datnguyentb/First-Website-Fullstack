import { unauthorizedResponse, forbiddenResponse } from '../utils/responseHelper.js';

export const requireRole = (role) => {
    return async (req, res, next) => {
        if (!req.user) {
            return unauthorizedResponse(res, 'You are not logged in.');
        }

        if (req.user.role !== role) {
            return forbiddenResponse(res, 'You do not have permission to access this resource.');
        }

        next();
    };
};
