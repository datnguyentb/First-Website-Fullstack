import mongoose from 'mongoose';
import Conversation from '../models/Conversation.js';

const getOrCreateConversation = async (user1Id, user2Id) => {
    if (String(user1Id) === String(user2Id)) {
        throw new Error('Cannot create conversation with yourself');
    }

    const pairKey = [String(user1Id), String(user2Id)].sort().join('_');

    let conversation = await Conversation.findOneAndUpdate(
        { pairKey },
        {
            $setOnInsert: {
                participants: [user1Id, user2Id],
                type: 'private',
                pairKey,
            },
        },
        {
            upsert: true,
            new: true,
        },
    )
        .populate('participants', 'firstName lastName avatarUrl')
        .lean();

    // 🔹 Lọc các field không muốn trả về
    const { __v, pairKey: _pairKey, deletedFor, activities, ...safeConversation } = conversation;

    return safeConversation;
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
const getUserConversations = async ({ userId, limit = 10, cursorUpdatedAt, cursorId }) => {
    const query = {
        participants: userId,
    };

    if (cursorUpdatedAt && cursorId) {
        query.$or = [
            { updatedAt: { $lt: new Date(cursorUpdatedAt) } },
            {
                updatedAt: new Date(cursorUpdatedAt),
                _id: { $lt: new mongoose.Types.ObjectId(cursorId) },
            },
        ];
    }

    return Conversation.find(query)
        .sort({ updatedAt: -1, _id: -1 })
        .limit(limit)
        .populate('participants', 'firstName lastName avatarUrl')
        .populate({
            path: 'lastMessage',
            populate: {
                path: 'sender',
                select: 'firstName lastName avatarUrl',
            },
        })
        .lean();
};

const updateLastMessage = async (conversationId, messageId) => {
    return Conversation.findByIdAndUpdate(conversationId, { lastMessage: messageId }, { new: true });
};

const getConversationDetail = async (conversationId) => {
    return Conversation.findById(conversationId)
        .populate('participants', 'firstName lastName avatarUrl')
        .populate({
            path: 'lastMessage',
            populate: {
                path: 'sender',
                select: 'firstName lastName avatarUrl',
            },
        });
};

export default {
    getOrCreateConversation,
    checkMembership,
    getUserConversations,
    updateLastMessage,
    getConversationDetail,
};
