import User from '../../models/User.js';
import { success as successResponse, error as errorResponse } from '../../utils/response.js';
import { userResponse } from '../../transformers/userResponse.js';
class UserController {
    getUserProfile = async (req, res) => {
        const userId = req.params.id;
        try {
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'Người dùng không tồn tại' });
            }

            return successResponse(
                res,
                'User information',
                userResponse(user, ['username', 'first_name', 'last_name', 'avatar_url', 'bio', 'createdAt']),
            );
        } catch (error) {
            return errorResponse(res, 'Lỗi khi lấy thông tin người dùng', error.message);
        }
    };
}

export default new UserController();
