import Message from '../models/Message.js';

class MessageRepository {
    //Create a new message
    static async create(data) {
        const message = await Message.create(data);

        return message.populate('sender', 'firstName lastName avatar');
    }

    static async findById(id) {
        return Message.findById(id).populate('sender', 'firstName lastName avatar').lean();
    }

    static async findByConversation(conversationId) {
        return Message.find({
            conversation: conversationId,
        })
            .populate('sender', 'firstName lastName avatar')
            .sort({ createdAt: -1 })
            .limit(20);
    }
}

export default MessageRepository;
