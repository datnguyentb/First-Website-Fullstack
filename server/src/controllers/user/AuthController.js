import User from '../../models/User.js';
import Playlist from '../../models/Playlist.js';
import { generateToken } from '../../utils/jwt.js';
import {
    okResponse,
    createdResponse,
    notFoundResponse,
    badRequestResponse,
    serverErrorResponse,
} from '../../utils/responseHelper.js';
import { registerValidator } from '../../validations/auth.js';
import { MESSAGE_RESPONSE } from '../../constants/index.js';

class AuthController {
    async register(req, res) {
        const { firstName, lastName, email, password } = req.body;

        const { error } = registerValidator(req.body);
        if (error) {
            return badRequestResponse(res, MESSAGE_RESPONSE.AUTH.INVALID_DATA, {
                password: 'Passwords do not match.',
            });
        }

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return badRequestResponse(res, MESSAGE_RESPONSE.AUTH.INVALID_CREDENTIALS, {
                    email: 'Email already exists.',
                });
            }

            //Create new user
            const newUser = new User({ firstName, lastName, email, password });
            await newUser.save();

            // Create favorite Playlist
            const favoritePlaylist = new Playlist({
                owner: newUser._id,
                name: 'Favorite Songs',
                description: 'Your liked songs',
                type: 'favorite',
                isPublic: false,
                images: '',
            });
            await favoritePlaylist.save();

            return createdResponse(res, MESSAGE_RESPONSE.AUTH.REGISTER_SUCCESS);
        } catch (error) {
            return serverErrorResponse(res);
        }
    }

    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return badRequestResponse(res, MESSAGE_RESPONSE.AUTH.INVALID_CREDENTIALS, {
                error: 'All fields are required.',
            });
        }

        try {
            const user = await User.findOne({ email, role: 'user' });
            if (!user || !(await user.comparePassword(password))) {
                return notFoundResponse(res, MESSAGE_RESPONSE.AUTH.INVALID_CREDENTIALS);
            }

            // Gán session nếu cần
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

            return okResponse(res, MESSAGE_RESPONSE.AUTH.LOGIN_SUCCESS, {
                token,
                role: user.role,
            });
        } catch (error) {
            return serverErrorResponse(res);
        }
    }

    checkToken(req, res) {
        return okResponse(res, MESSAGE_RESPONSE.AUTH.TOKEN_VALID);
    }
}

export default new AuthController();
