import User from '../../models/User.js';
import { okResponse, serverErrorResponse } from '../../utils/responseHelper.js';

class AdminUserController {
    getUserNumber = async (req, res) => {
        try {
            const totalUsers = await User.countDocumentsWithDeleted({ role: 'user' });
            return okResponse(res, 'Retrieved user count successfully', totalUsers);
        } catch {
            return serverErrorResponse(res, 'Failed to retrieve user count');
        }
    };
}

export default new AdminUserController();
