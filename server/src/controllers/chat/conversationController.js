import {
    okResponse,
    badRequestResponse,
    serverErrorResponse,
    createdResponse,
    notFoundResponse,
    forbiddenResponse,
} from '../../utils/responseHelper.js';
import Conversation from '../../models/Conversation.js';

class ConversationController {
    // 🚀 Lấy hoặc tạo cuộc trò chuyện private giữa 2 user
    getOrCreateConversation = async (req, res) => {
        try {
            const { userId } = req.body;
            const myId = req.user._id;

            if (!userId || !myId) {
                return res.status(400).json({ message: 'Missing user IDs' });
            }

            // 🔍 1. Tìm xem đã có cuộc trò chuyện private giữa 2 người chưa
            let conversation = await Conversation.findOne({
                type: 'private',
                participants: { $all: [userId, myId] },
            })
                .populate('participants', 'username avatar')
                .populate('lastMessage');

            // 🚀 2. Nếu chưa có thì tạo mới
            if (!conversation) {
                conversation = await Conversation.create({
                    participants: [userId, myId],
                    type: 'private',
                });

                conversation = await conversation.populate('participants', 'username avatar');
            }

            console.log('getOrCreateConversation called');
            // ✅ 3. Trả về conversation
            return res.status(200).json({ success: true, conversation });
        } catch (error) {
            console.error('getOrCreateConversation error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    };
}

export default new ConversationController();
