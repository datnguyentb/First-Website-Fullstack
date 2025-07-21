import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Nhớ import model User
import { success as successResponse, error as errorResponse } from '../utils/response.js';
import ERROR_CODES from '../constants/errorCodes.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const authenticateJWT = async (req, res, next) => {
    // 👈 thêm async
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Chưa đăng nhập hoặc thiếu token',
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Người dùng không tồn tại',
            });
        }

        if (user.lockedAt) {
            return errorResponse(res, 'Tài khoản của bạn đã bị khóa', ERROR_CODES.USER_LOCKED);
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Token không hợp lệ hoặc đã hết hạn!',
        });
    }
};
