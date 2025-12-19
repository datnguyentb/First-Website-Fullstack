export function validateMessage(data) {
    if (!data || typeof data !== 'object') return null;

    const { content, attachments, replyTo, conversation, sender } = data;

    // 1. Kiểm tra bắt buộc phải có cuộc hội thoại
    if (!conversation) {
        console.warn('⚠️ validateMessage: Tin nhắn không có conversation ID');
        return null;
    }

    const hasContent = content && content.trim().length > 0;
    const hasAttachments = Array.isArray(attachments) && attachments.length > 0;

    if (!hasContent && !hasAttachments) return null;

    let type = 'text';
    if (hasAttachments) {
        type = attachments[0].type || 'file';
    }

    return {
        _id: data._id,
        conversation,
        content: hasContent ? content.trim() : '',
        attachments: hasAttachments ? attachments : [],
        replyTo: replyTo || null,
        sender: sender || null,
        type,
        createdAt: data.createdAt || new Date().toISOString(),
    };
}
