// controllers/UserController.js
import User from '../../models/User.js';
import { error as errorResponse, success as successRespone } from '../../utils/response.js';
import ERROR_CODES from '../../constants/errorCodes.js';

const MeController = {
    async getCurrentUser(req, res) {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return errorResponse(res, 'Token không hợp lệ hoặc chưa đăng nhập', ERROR_CODES.UNAUTHORIZED);
            }

            const user = await User.findById(userId).select('-password');

            if (!user) {
                return errorResponse(res, 'Không tìm thấy người dùng', ERROR_CODES.NOT_FOUND);
            }

            return successRespone(res, 'Lấy thông tin người dùng thành công', { user });
        } catch (err) {
            console.error('❌ Lỗi lấy thông tin user:', err);
            return errorResponse(res, 'Lỗi máy chủ', ERROR_CODES.SERVER_ERROR);
        }
    },
};

export default MeController;
