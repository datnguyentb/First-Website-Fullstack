import User from '../../models/User.js';
import { okResponse, badRequestResponse, notFoundResponse, serverErrorResponse } from '../../utils/responseHelper.js';
import { formatFullUser, formatOtherFullInfor } from '../../helper/formatUser.js';
import { v2 as cloudinary } from 'cloudinary';

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

            // 1. Lấy thông tin URL và public_id do Cloudinary middleware trả về
            const newAvatar = {
                url: req.file.url,
                public_id: req.file.public_id,
            };

            // 2. Lấy thông tin user hiện tại để kiểm tra avatar cũ trên cloud
            const currentUser = await User.findById(req.user._id);
            const oldAvatarPublicId = currentUser?.avatar?.public_id;

            // 3. Cập nhật avatar mới vào MongoDB
            const updatedUser = await User.findByIdAndUpdate(req.user._id, { avatar: newAvatar }, { new: true });

            // 4. Nếu trước đó user có avatar trên Cloudinary thì tiến hành xóa file cũ đi để tránh rác cloud
            if (oldAvatarPublicId) {
                await cloudinary.uploader.destroy(oldAvatarPublicId);
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
