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

            // Successful login
            req.session.user = {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                avatarUrl: user.avatarUrl,
                role: user.role,
            };

            const token = generateToken({
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                avatarUrl: user.avatarUrl,
                bio: user.bio,
            });

            return okResponse(res, 'Login successful', {
                token,
                user: formatItem(user, ['_id', 'firstName', 'lastName', 'avatarUrl', 'bio']),
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
