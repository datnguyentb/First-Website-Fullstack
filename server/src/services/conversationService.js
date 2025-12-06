import mongoose from 'mongoose';
import Conversation from '../models/Conversation.js';

const getOrCreateConversation = async (user1Id, user2Id) => {
    // 1. Tìm kiếm
    let conversation = await Conversation.findOne({
        type: 'private',
        participants: { $all: [user1Id, user2Id] },
    });

    // 2. Tạo mới nếu chưa có
    if (!conversation) {
        conversation = await Conversation.create({
            participants: [user1Id, user2Id],
            type: 'private',
        });
    }

    // 3. Populate và trả về (Có thể tách logic populate ra khỏi service này nếu cần)
    conversation = await Conversation.findById(conversation._id)
        .populate('participants', 'firstName lastName avatarUrl')
        .lean();

    return conversation;
};

// Hàm mới để kiểm tra thành viên (cần cho Socket.IO)
const checkMembership = async (conversationId, userId) => {
    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
        return false;
    }
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) return false;

    return conversation.participants.some((p) => p.equals(userId));
};

export default { getOrCreateConversation, checkMembership };
