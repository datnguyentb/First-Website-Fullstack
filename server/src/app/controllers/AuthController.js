import User from '../../models/User.js';
import { generateToken } from '../../utils/jwt.js';
import { error as errorResponse, success as successRespone } from '../../utils/response.js';
import { registerValidator, loginValidator } from '../../validations/auth.js';
import ERROR_CODES from '../../constants/errorCodes.js';
import { userResponse } from '../../transformers/userResponse.js';

class AuthController {
    register(req, res, next) {
        const { first_name, last_name, email, password } = req.body;

        // Kiểm tra xem mật khẩu và xác nhận mật khẩu có khớp không
        const { error } = registerValidator(req.body);
        if (error) {
            return errorResponse(res, 'Dữ liệu không hợp lệ.', ERROR_CODES.VALIDATION_ERROR, {
                [error.details[0].path[0]]: error.details[0].message,
            });
        }

        User.findOne({ email })
            .then((user) => {
                if (user) {
                    errorResponse(res, 'Email đã tồn tại', ERROR_CODES.EMAIL_EXISTS);
                    return null;
                }

                const newUser = new User({
                    first_name,
                    last_name,
                    email,
                    password,
                });
                return newUser.save();
            })
            .then((savedUser) => {
                if (savedUser) {
                    return successRespone(res, 'Đăng ký thành công', {});
                }
            })
            .catch((err) => {
                console.error(err);
                next(err);
            });
    }

    //[POST] /auth/login
    login(req, res, next) {
        const { email, password } = req.body;
        const { error } = loginValidator(req.body);
        if (!email || !password) {
            return errorResponse(res, 'Dữ liệu không hợp lệ', ERROR_CODES.VALIDATION_ERROR, {
                [error.details[0].path[0]]: error.details[0].message,
            });
        }
        User.findOne({ email, role: 'user' })
            .then(async (user) => {
                if (!user) {
                    return errorResponse(res, 'Email không tồn tại', ERROR_CODES.EMAIL_NOT_FOUND);
                }
                const isMatch = await user.comparePassword(password);
                if (!isMatch) {
                    return errorResponse(res, 'Mật khẩu không đúng', ERROR_CODES.INVALID_PASSWORD);
                }

                // Đăng nhập thành công
                req.session.user = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    avatar_url: user.avatar_url,
                    role: user.role,
                };

                const token = generateToken({
                    id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    avatar_url: user.avatar_url,
                    bio: user.bio,
                });

                return successRespone(res, 'Đăng nhập thành công', {
                    token,
                    user: userResponse(user, ['_id', 'first_name', 'last_name', 'avatar_url', 'bio']),
                });
            })
            .catch((err) => {
                console.error(err);
                next(err);
            });
    }

    checkToken(req, res) {
        return successRespone(res, 'Token hợp lệ', {});
    }
}

export default new AuthController();
