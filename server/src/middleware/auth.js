// middlewares/auth.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const authenticateJWT = (req, res, next) => {
    console.log('authHeader:', authHeader);
    const authHeader = req.headers.authorization;

    // Kiểm tra xem có header Authorization và bắt đầu bằng "Bearer"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Chưa đăng nhập hoặc thiếu token',
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Giải mã token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Gắn user từ token vào request
        req.user = decoded;

        // Tiếp tục tới route tiếp theo
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Token không hợp lệ hoặc đã hết hạn',
        });
    }
};
