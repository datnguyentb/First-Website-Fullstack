import Message from '../../models/Message.js';
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
                .populate('participants', 'firstName lastName avatarUrl')
                .populate({
                    path: 'lastMessage',
                    populate: { path: 'sender', select: 'firstName lastName avatarUrl' },
                });

            // 🚀 2. Nếu chưa có thì tạo mới
            if (!conversation) {
                conversation = await Conversation.create({
                    participants: [userId, myId],
                    type: 'private',
                });

                conversation = await Conversation.findById(conversation._id)
                    .populate('participants', 'firstName lastName avatarUrl')
                    .populate({
                        path: 'lastMessage',
                        populate: { path: 'sender', select: 'firstName lastName avatarUrl' },
                    });
            }

            // 💬 3. Lấy danh sách tin nhắn (ví dụ 50 tin gần nhất)
            const messages = await Message.find({ conversation: conversation._id })
                .populate('sender', 'firstName lastName avatarUrl')
                .populate('reactions.user', 'firstName lastName avatarUrl')
                .sort({ createdAt: -1 })
                .limit(50);
            // ✅ 4. Trả về kết quả
            return res.status(200).json({
                success: true,
                conversation,
                messages: messages.reverse(),
            });
        } catch (error) {
            console.error('getOrCreateConversation error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    };
}

export default new ConversationController();
