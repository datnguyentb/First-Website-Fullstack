import { type } from 'os';
import { formatSimpleUser } from './formatUser.js';

export const formatMessage = (message) => {
    if (!message) return;
    const senderUser = formatSimpleUser(message.sender);
    const messageContent = message.metadata.isUnsent ? 'This message was unsent.' : message.content;

    return {
        _id: message._id,
        conversation: message.conversation,
        sender: senderUser,
        type: message.type,
        content: messageContent,
        attachments: message.attachments,
        metadata: message.metadata,
        replyTo: message.replyTo,
        status: message.status,
        seenBy: message.seenBy,
        reactions: message.reactions,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
    };
};
