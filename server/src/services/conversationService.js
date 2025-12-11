import mongoose from 'mongoose';
import Conversation from '../models/Conversation.js';
import { get } from 'http';

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

    const conversation = await Conversation.findById(conversationId).select('participants').lean();

    if (!conversation) return false;

    // Convert userId về ObjectId
    const uid = new mongoose.Types.ObjectId(userId);

    return conversation.participants.some((p) => {
        return uid.equals(p); // p có thể là string hoặc ObjectId → vẫn chạy đúng
    });
};

//get All conversations of a user
const getUserConversations = async (userId) => {
    const conversations = await Conversation.find({
        participants: userId,
    })
        .populate('participants', 'firstName lastName avatarUrl')
        .populate('lastMessage')
        .sort({ updatedAt: -1 })
        .lean();
    return conversations;
};

export default { getOrCreateConversation, checkMembership, getUserConversations };
