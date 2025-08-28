import User from '../../models/User.js';
import { okResponse, badRequestResponse, notFoundResponse, serverErrorResponse } from '../../utils/responseHelper.js';
import { formatItem } from '../../utils/formatter.js';
import fs from 'fs';
import path from 'path';

class UserController {
    // GET /me/less
    getMeInfor = async (req, res) => {
        const user = req.user;
        if (!user) return notFoundResponse(res, 'User not found');

        return okResponse(
            res,
            'User information retrieved successfully',
            formatItem(user, ['_id', 'firstName', 'lastName', 'avatarUrl', 'bio', 'createdAt'], {}),
        );
    };

    // GET /users/me/all
    getMeALlInfor(req, res) {
        return okResponse(
            res,
            'User information retrieved successfully',
            formatItem(req.user, [
                '_id',
                'firstName',
                'lastName',
                'avatarUrl',
                'email',
                'birthdate',
                'gender',
                'location',
                'bio',
                'phone',
                'createdAt',
            ]),
        );
    }

    // PATCH /users/update-avatar
    updateAvatar = async (req, res) => {
        try {
            if (!req.file) {
                return badRequestResponse(res, 'No image file uploaded');
            }

            const newAvatarUrl = `/uploads/avatars/${req.file.filename}`;
            const oldAvatarPath = req.user.avatarUrl ? path.join(process.cwd(), 'src', req.user.avatarUrl) : null;

            const updatedUser = await User.findByIdAndUpdate(req.user._id, { avatarUrl: newAvatarUrl }, { new: true });

            if (oldAvatarPath && fs.existsSync(oldAvatarPath)) {
                fs.unlinkSync(oldAvatarPath);
            }

            return okResponse(
                res,
                'Avatar updated successfully',
                formatItem(updatedUser, ['_id', 'firstName', 'lastName', 'bio', 'avatarUrl', 'createdAt']),
            );
        } catch (error) {
            return serverErrorResponse(res, 'Error updating avatar');
        }
    };

    // PATCH /users/update-info
    updateMeInfo = async (req, res) => {
        try {
            const filtered = req.filteredBody || {};

            const updatedUser = await User.findByIdAndUpdate(req.user._id, filtered, { new: true });

            return okResponse(
                res,
                'User information updated successfully',
                formatItem(updatedUser, ['_id', 'firstName', 'lastName', 'bio', 'avatarUrl', 'createdAt']),
            );
        } catch (error) {
            return serverErrorResponse(res, 'Error updating user information');
        }
    };

    // PATCH /users/update-info
    followUser = async (req, res) => {};

    unfollowUser = async (req, res) => {};

    getFriends = async (req, res) => {};
}

export default new UserController();
