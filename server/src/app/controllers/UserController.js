import User from '../../models/User.js';
import { success as successRespone } from '../../utils/response.js';

class UserController {
    getUserProfile(req, res) {
        const user = req.user;
        return successRespone(res, 'Lấy thông tin người dùng thành công', user);
    }
}

export default new UserController();
