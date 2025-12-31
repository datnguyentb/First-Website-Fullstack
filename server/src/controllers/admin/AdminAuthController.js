import User from '../../models/User.js';
import { generateToken } from '../../utils/jwt.js';
import {
    okResponse,
    badRequestResponse,
    unauthorizedResponse,
    serverErrorResponse,
} from '../../utils/responseHelper.js';
import { loginValidator } from '../../validations/auth.js';
import { formatItem } from '../../utils/formatter.js';
import { formatFullUser } from '../../helper/formatUser.js';

class AdminAuthController {
    async login(req, res) {
        const { email, password } = req.body;
        const { error } = loginValidator(req.body);

        if (!email || !password || error) {
            return badRequestResponse(res, 'Invalid input', {
                [error?.details?.[0]?.path?.[0] || 'field']: error?.details?.[0]?.message || 'Missing field',
            });
        }

        try {
            const user = await User.findOne({ email, role: 'admin' });

            if (!user) {
                return unauthorizedResponse(res, 'Email not found');
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return unauthorizedResponse(res, 'Incorrect password');
            }

            const formattedUser = formatFullUser(user);

            // Successful login
            req.session.user = formattedUser;

            const token = generateToken(formattedUser);

            return okResponse(res, 'Login successful', {
                token,
                role: user.role,
            });
        } catch (err) {
            return serverErrorResponse(res, 'Server error during login');
        }
    }

    checkToken(req, res) {
        return okResponse(res, 'Token is valid', {});
    }
}

export default new AdminAuthController();
