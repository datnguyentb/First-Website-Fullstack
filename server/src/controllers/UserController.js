import User from '../models/User.js';
import { success as successResponse, error as errorResponse } from '../utils/response.js';
import { formatItem } from '../utils/formatter.js';
import fs from 'fs';
import path from 'path';

class UserController {
    getUserProfile = async (req, res) => {
        const userId = req.params.id;
        try {
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'Người dùng không tồn tại' });
            }

            const isUserLogin = req.user._id.toString() === userId;
            return successResponse(
                res,
                'User information',
                formatItem(user, ['_id', 'firstName', 'lastName', 'avatarUrl', 'bio', 'createdAt'], {
                    isUserLogin: isUserLogin,
                }),
            );
        } catch (error) {
            return errorResponse(res, 'Lỗi khi lấy thông tin người dùng', error.message);
        }
    };

    getMe(req, res, next) {
        return successResponse(
            res,
            'Api User information Success',
            formatItem(req.user, [
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

    updateAvatar = async (req, res) => {
        try {
            if (!req.file) {
                return errorResponse(res, 'Không tìm thấy file ảnh gửi lên');
            }

            const newAvatarUrl = `/uploads/avatars/${req.file.filename}`;
            const oldAvatarPath = req.user.avatarUrl ? path.join(process.cwd(), 'src', req.user.avatarUrl) : null;

            const updatedUser = await User.findByIdAndUpdate(req.user._id, { avatarUrl: newAvatarUrl }, { new: true });

            // Xoá ảnh cũ nếu tồn tại
            if (oldAvatarPath && fs.existsSync(oldAvatarPath)) {
                fs.unlinkSync(oldAvatarPath);
            }

            successResponse(
                res,
                'Cập nhật avatar thành công',
                formatItem(updatedUser, ['_id', 'firstName', 'lastName', 'bio', 'avatarUrl', 'createdAt']),
            );
        } catch (error) {
            errorResponse(res, 'Có lỗi xảy ra khi cập nhật avatar');
        }
    };

    // PATCH /users/update-info
    updateMeInfo = async (req, res) => {
        try {
            const filtered = req.filteredBody || {};

            const updatedUser = await User.findByIdAndUpdate(req.user._id, filtered, { new: true });

            successResponse(
                res,
                'Cập nhật thông tin thành công',
                formatItem(updatedUser, ['_id', 'firstName', 'lastName', 'bio', 'avatarUrl', 'createdAt']),
            );
        } catch (error) {
            errorResponse(res, 'Có lỗi xảy ra khi cập nhật thông tin');
        }
    };
}

export default new UserController();
