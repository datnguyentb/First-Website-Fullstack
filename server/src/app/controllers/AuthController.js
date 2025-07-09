import User from '../../models/User.js';
import { generateToken } from '../../utils/jwt.js';
import { error as errorResponse, success as successRespone } from '../../utils/response.js';
import { registerValidator, loginValidator } from '../../validations/auth.js';
import ERROR_CODES from '../../constants/errorCodes.js';
import { authenticateJWT } from '../../middleware/auth.js';

class AuthController {
    register(req, res, next) {
        const { first_name, last_name, email, password } = req.body;

        // Kiểm tra xem mật khẩu và xác nhận mật khẩu có khớp không
        const { error } = registerValidator(req.body);
        if (error) {
            return errorResponse(res, 'Dữ liệu không hợp lệ', ERROR_CODES.VALIDATION_ERROR, {
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
        User.findOne({ email })
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
                    avatarUrl: user.avatarUrl,
                    role: user.role,
                };

                const token = generateToken({
                    id: user._id,
                    email: user.email,
                    role: user.role,
                });

                return successRespone(res, 'Đăng nhập thành công', {
                    token,
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        avatarUrl: user.avatarUrl,
                        role: user.role,
                    },
                });
            })
            .catch((err) => {
                console.error(err);
                next(err);
            });
    }

    checkToken = async (req, res) => {
        try {
            if (!req.user) {
                return errorResponse(res, 'Chưa đăng nhập hoặc token không hợp lệ', ERROR_CODES.UNAUTHORIZED);
            }

            const userId = req.user.id;

            const user = await User.findById(userId).select('-password');
            if (!user) {
                return errorResponse(res, 'Người dùng không tồn tại', ERROR_CODES.UNAUTHORIZED);
            }

            return successRespone(res, 'Token hợp lệ', {
                user,
            });
        } catch (error) {
            console.error('❌ Lỗi khi kiểm tra token:', error);
            return errorResponse(res, 'Lỗi máy chủ', ERROR_CODES.SERVER_ERROR);
        }
    };
}

export default new AuthController();
