import ConversationService from '../../services/conversationService.js';

export const canAccessConversation = async (conversationId, userId) => {
    return await ConversationService.checkMembership(conversationId, userId);
};
