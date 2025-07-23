import User from '../../models/User.js';
import { error as errorResponse, success as successRespone } from '../../utils/response.js';

class AdminUserController {
    getUserNumber = async (req, res, next) => {
        try {
            const totalUsers = await User.countDocumentsWithDeleted({ role: 'user' });

            successRespone(res, 'Get Success!', totalUsers);
        } catch {
            errorResponse(res, 'Failed To Get!');
        }
    };
}

export default new AdminUserController();
