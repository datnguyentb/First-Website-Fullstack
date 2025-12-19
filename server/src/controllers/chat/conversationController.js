import { formatConversation } from '../../helper/formatConversation.js';
import ConversationService from '../../services/conversationService.js';
import { okResponse } from '../../utils/responseHelper.js';

class ConversationController {
    // 🚀 Lấy hoặc tạo cuộc trò chuyện private giữa 2 user
    getOrCreateConversation = async (req, res) => {
        try {
            const { userId } = req.body;
            const myId = req.user._id;

            if (!userId || !myId) {
                return res.status(400).json({ message: 'Missing user IDs' });
            }

            // 🔍 1 & 2. Sử dụng Service để Tìm hoặc Tạo
            const conversation = await ConversationService.getOrCreateConversation(myId, userId);

            // ✅ 3. Trả về kết quả
            return res.status(200).json({
                success: true,
                conversation,
            });
        } catch (error) {
            // ... xử lý lỗi ...
        }
    };

    // 🚀 Lấy danh sách cuộc trò chuyện của user (cursor-based pagination)
    getAllConversations = async (req, res) => {
        try {
            const myId = req.user?._id;
            if (!myId) {
                return res.status(400).json({ message: 'Missing user ID' });
            }

            const { limit = 10, cursorUpdatedAt, cursorId } = req.query;

            const conversations = await ConversationService.getUserConversations({
                userId: myId,
                limit: Number(limit),
                cursorUpdatedAt,
                cursorId,
            });

            //  Format toàn bộ member
            const formattedData = conversations.map((conv) => formatConversation(conv, myId));

            return okResponse(res, 'Get conversations succesfully!', formattedData);
        } catch (error) {
            console.error('getAllConversations error:', error);
            return serverErrorResponse(res, 'Server error');
        }
    };

    getConversationDetail = async (req, res) => {
        try {
            const conversationId = req.params.conversationId;
            const myId = req.user?._id;
            if (!conversationId) {
                return res.status(400).json({ message: 'Missing user conversationId' });
            }

            //kiểm tra có trong converation không
            const isParticipant = await ConversationService.checkMembership(conversationId, myId);

            // lấy thông tin coversation
            const conversationInfor = await ConversationService.getConversationDetail(conversationId);
            return okResponse(res, 'Get conversation sucessfully!', formatConversation(conversationInfor, myId));
        } catch (error) {
            console.error(error);
        }
    };
}

export default new ConversationController();
