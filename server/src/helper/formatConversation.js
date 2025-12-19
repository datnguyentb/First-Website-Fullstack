import { formatUser } from './formatUser.js';

export const formatConversation = (conversation, currentUserId) => {
    // 🛡️ CHẶN LỖI 1: Kiểm tra đầu vào
    if (!conversation) return null;

    try {
        const conv = conversation.toObject ? conversation.toObject() : conversation;

        // 🛡️ CHẶN LỖI 2: Đảm bảo participants là mảng trước khi map
        const participants = Array.isArray(conv.participants) ? conv.participants : [];
        const formattedParticipants = participants.map((p) => formatUser(p));

        // 2. Tìm partner (cho chat 1-1)
        const partner =
            conv.type === 'private'
                ? formattedParticipants.find((p) => p._id?.toString() !== currentUserId?.toString())
                : null;

        // 🛡️ CHẶN LỖI 3: Kiểm tra thông tin lastMessage và sender
        // Nếu lastMessage.sender chưa được populate, formatUser sẽ nhận vào null/undefined
        let formattedLastMessage = null;
        if (conv.lastMessage) {
            formattedLastMessage = {
                content: conv.lastMessage.content || '',
                type: conv.lastMessage.type || 'text',
                createdAt: conv.lastMessage.createdAt,
                // Chỉ format nếu sender tồn tại, nếu không sẽ bị crash
                sender: conv.lastMessage.sender ? formatUser(conv.lastMessage.sender) : null,
            };
        }

        return {
            _id: conv._id,
            type: conv.type,
            // Sử dụng Optional Chaining (?.) để tránh lỗi nếu partner null
            name: conv.type === 'private' ? partner?.fullName : conv.name,
            avatar: conv.type === 'private' ? partner?.avatar : conv.avatar,
            lastMessage: formattedLastMessage,
            participants: formattedParticipants,
            updatedAt: conv.updatedAt,
            theme: conv.theme,
            customEmoji: conv.customEmoji,
        };
    } catch (error) {
        console.error('❌ Lỗi trong formatConversation:', error);
        return null; // Trả về null thay vì làm sập server
    }
};
