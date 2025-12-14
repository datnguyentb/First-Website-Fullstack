import Message from '../../models/Message.js';
import ConversationService from '../../services/conversationService.js';

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

            return res.status(200).json(conversations);
        } catch (error) {
            console.error('getAllConversations error:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    };
}

export default new ConversationController();
