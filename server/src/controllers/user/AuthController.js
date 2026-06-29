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
import { formatFullUser } from '../../helper/formatUser.js';

class AuthController {
    async register(req, res) {
        const { firstName, lastName, email, password } = req.body;
        console.log('password: ', password);

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
                description: 'A collection of your all-time favorite tracks. Enjoy listening!',
                type: 'favorite',
                isPublic: false,
                images: '',
            });
            await favoritePlaylist.save();

            return createdResponse(res, MESSAGE_RESPONSE.AUTH.REGISTER_SUCCESS);
        } catch (error) {
            console.error('Error during registration:', error);
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

            const formattedUser = formatFullUser(user);

            // Gán session nếu cần
            req.session.user = formattedUser;

            const token = generateToken(formattedUser);
            return okResponse(res, MESSAGE_RESPONSE.AUTH.LOGIN_SUCCESS, {
                token,
                role: user.role,
            });
        } catch (error) {
            console.error('Error during login:', error);
            return serverErrorResponse(res);
        }
    }

    checkToken(req, res) {
        return okResponse(res, MESSAGE_RESPONSE.AUTH.TOKEN_VALID);
    }
}

export default new AuthController();
