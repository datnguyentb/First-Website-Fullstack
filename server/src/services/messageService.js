import mongoose from 'mongoose';
import Message from '../models/Message.js';

const saveMessage = async (payload) => {
    const { sender, conversation, content, type, attachments, replyTo, metadata } = payload;

    if (!sender || !conversation || !content) {
        throw new Error('Missing required fields');
    }

    const newMessage = new Message({
        sender,
        conversation,
        content,
        type: type || 'text',
        attachments: attachments || [],
        replyTo: replyTo || null,
        seenBy: [],
        metadata: {
            clientSideId: metadata.clientSideId || null,
        },
    });

    await newMessage.save();

    // Populate trước khi trả về
    return newMessage.populate('sender', 'firstName lastName avatar');
};

const getMessages = async (conversationId) => {
    if (!conversationId) {
        throw new Error('Missing conversationId');
    }

    const messages = await Message.find({ conversation: conversationId })
        .populate('sender', 'firstName lastName avatar')
        .sort({ createdAt: -1 })
        .limit(20);

    return messages;
};

export default { saveMessage, getMessages };
