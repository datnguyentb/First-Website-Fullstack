import {
    okResponse,
    createdResponse,
    notFoundResponse,
    forbiddenResponse,
    badRequestResponse,
    serverErrorResponse,
} from '../../utils/responseHelper.js';

import { MESSAGE_RESPONSE } from '../../constants/index.js';
import { RoomModel } from '../../models/Room.js';
import { MESSAGE } from '../../constants/messages.js';
import RoomService from '../../services/coListening/RoomService.js';

class CoListeningController {
    async create(req, res) {
        try {
            const { name, roomMode, playbackMode, password } = req.body;
            const hostId = req.user?._id; // Lấy từ auth middleware của hệ thống bạn

            // 1. Kiểm tra bắt buộc phải có tên phòng
            if (!name || !name.trim()) {
                return badRequestResponse(res, MESSAGE.CO_LISTENING.EMPTY_NAME);
            }

            // 2. Nếu là phòng private, bắt buộc phải nhập mật khẩu
            if (roomMode === 'private' && (!password || !password.trim())) {
                return badRequestResponse(res, MESSAGE.CO_LISTENING.PASSWORD_REQUIRED);
            }

            // 3. Gom dữ liệu sạch (Giữ mật khẩu dạng thô - plain text)
            const roomData = {
                name: name.trim(),
                roomMode: roomMode || 'public',
                playbackMode: playbackMode || 'radio',
                hostId,
                password: roomMode === 'private' ? password : null,
            };

            const newRoom = await RoomService.createRoom(roomData);

            // 5. Trả về kết quả (Hàm toJSON cấu hình trong Model đã tự ẩn trường password đi rồi)
            return createdResponse(res, MESSAGE.CO_LISTENING.CREATE_SUCCESS, newRoom);
        } catch (err) {
            console.error('Error at CoListeningController.create:', err);
            return serverErrorResponse(res, MESSAGE.COMMON.SERVER_ERROR);
        }
    }

    async getAllRoom(req, res) {
        try {
            const allRooms = await RoomService.getAllRoom();
            return okResponse(res, MESSAGE.CO_LISTENING.GET_ALL_SUCCESS, allRooms);
        } catch (err) {
            console.error(MESSAGE.CO_LISTENING.GET_ALL_FAIL);
            return serverErrorResponse(res, MESSAGE.CO_LISTENING.GET_ALL_FAIL);
        }
    }
}

export default new CoListeningController();
