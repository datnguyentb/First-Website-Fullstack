import User from '../models/User.js';

export const requireRole = (role) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Chưa đăng nhập' });
        }

        const user = await User.findById(req.user.id);
        if (!user || user.role !== role) {
            return res.status(403).json({ message: 'Không có quyền truy cập' });
        }

        next();
    };
};
