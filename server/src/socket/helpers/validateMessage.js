export function validateMessage(data) {
    if (!data || typeof data !== 'object') return null;

    const { content, attachments, replyTo, conversation } = data;

    const hasContent = content && content.trim().length > 0;
    const hasAttachments = Array.isArray(attachments) && attachments.length > 0;

    if (!hasContent && !hasAttachments) return null;

    // 🔍 Xác định type
    let type = 'text';

    if (hasAttachments) {
        // Lấy loại đầu tiên (image, video, audio, file)
        const firstAttachment = attachments[0];
        type = firstAttachment.type || 'file';
    }

    const cleanMessage = {
        content: hasContent ? content.trim() : '',
        attachments: hasAttachments ? attachments : [],
        replyTo: replyTo || null,
        conversation: conversation || null,
        type,
    };

    return cleanMessage;
}
