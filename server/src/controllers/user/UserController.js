import User from '../../models/User.js';
import { okResponse, badRequestResponse, notFoundResponse, serverErrorResponse } from '../../utils/responseHelper.js';
import fs from 'fs';
import path from 'path';
import { formatFullUser, formatOtherFullInfor } from '../../helper/formatUser.js';

class UserController {
    // GET /me/less
    getMeInfor = async (req, res) => {
        const user = req.user;
        if (!user) return notFoundResponse(res, 'User not found');

        return okResponse(res, 'User information retrieved successfully', formatFullUser(user));
    };

    // GET /users/me/all
    getMeAllInfor(req, res) {
        return okResponse(res, 'User information retrieved successfully', formatFullUser(req.user));
    }

    // PATCH /users/update-avatar
    updateAvatar = async (req, res) => {
        try {
            if (!req.file) {
                return badRequestResponse(res, 'No image file uploaded');
            }

            const newAvatar = `/uploads/avatars/${req.file.filename}`;
            const oldAvatarPath = req.user.avatar ? path.join(process.cwd(), 'src', req.user.avatar) : null;

            const updatedUser = await User.findByIdAndUpdate(req.user._id, { avatar: newAvatar }, { new: true });

            if (oldAvatarPath && fs.existsSync(oldAvatarPath)) {
                fs.unlinkSync(oldAvatarPath);
            }

            return okResponse(res, 'Avatar updated successfully', formatFullUser(updatedUser));
        } catch (error) {
            console.error('Error updating avatar:', error);
            return serverErrorResponse(res, 'Error updating avatar');
        }
    };

    // PATCH /users/update-info
    updateMeInfo = async (req, res) => {
        try {
            const filtered = req.filteredBody || {};

            const updatedUser = await User.findByIdAndUpdate(req.user._id, filtered, { new: true });

            return okResponse(res, 'User information updated successfully', formatFullUser(updatedUser));
        } catch (error) {
            console.error('Error updating user information:', error);
            return serverErrorResponse(res, 'Error updating user information');
        }
    };

    getUserById = async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);

            if (!user) {
                return notFoundResponse(res, 'User not found');
            }

            return okResponse(res, 'User information retrieved successfully', formatOtherFullInfor(user));
        } catch (error) {
            console.error('Error retrieving user information:', error);
            return serverErrorResponse(res, 'Error retrieving user information');
        }
    };
}

export default new UserController();
