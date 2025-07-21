import User from '../../models/User.js';
import { success as successResponse, error as errorResponse } from '../../utils/response.js';
import { formatItem } from '../../utils/formatter.js';
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

    updateUser = async (req, res) => {
        try {
            const user = req.body;

            let oldAvatarPath = null;

            // Nếu có file mới thì cập nhật avatar mới và chuẩn bị đường dẫn xóa ảnh cũ
            if (req.file) {
                const newAvatarUrl = `/uploads/avatars/${req.file.filename}`;
                user.avatarUrl = newAvatarUrl;

                // Chỉ lấy ảnh cũ nếu có upload ảnh mới
                if (req.user.avatar_url) {
                    oldAvatarPath = path.join(process.cwd(), 'src', req.user.avatarUrl);
                }
            }

            const updatedUser = await User.findByIdAndUpdate(req.user._id, user, { new: true });

            // Chỉ xóa nếu có ảnh mới được upload và có ảnh cũ tồn tại
            if (oldAvatarPath && fs.existsSync(oldAvatarPath)) {
                fs.unlinkSync(oldAvatarPath);
            }

            successResponse(
                res,
                'Cập nhật thông tin thành công',
                formatItem(updatedUser, ['_id', 'firstName', 'lastName', 'bio', 'avatarUrl', 'createdAt']),
            );
        } catch (error) {
            console.error(error);
            errorResponse(res, 'Có lỗi xảy ra khi cập nhật thông tin người dùng');
        }
    };
}

export default new UserController();
