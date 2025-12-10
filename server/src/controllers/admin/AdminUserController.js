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

    getAllUsers = async (req, res) => {
        try {
            const users = await User.find().select('-password');
            return okResponse(res, 'Retrieved all users successfully', users);
        } catch {
            return serverErrorResponse(res, 'Failed to retrieve users');
        }
    };
}

export default new AdminUserController();
