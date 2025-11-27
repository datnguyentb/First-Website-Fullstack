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
            const conversation = await ConversationService.findOrCreatePrivateConversation(myId, userId);

            // 💬 3. Lấy danh sách tin nhắn (Không đổi)
            const messages = await Message.find({ conversation: conversation._id })
                // ... populate và sort ...
                .sort({ createdAt: -1 })
                .limit(50);

            // ✅ 4. Trả về kết quả
            return res.status(200).json({
                success: true,
                conversation,
                messages: messages.reverse(),
            });
        } catch (error) {
            // ... xử lý lỗi ...
        }
    };
}

export default new ConversationController();
