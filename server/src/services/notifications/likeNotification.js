import Notification from '../../models/Notification.js';

export const likeNotification = async ({ userId, post }) => {
    // ❌ Không tự notify chính mình
    if (post.author._id.toString() === userId.toString()) return null;

    const existing = await Notification.findOne({
        recipient: post.author,
        category: 'SOCIAL',
        action: 'LIKE',
        'target.type': 'POST',
        'target.targetId': post._id,
    });

    // 🟡 CASE 1: Đã có notification → update
    if (existing) {
        const isExist = existing.actors.some((id) => id.toString() === userId.toString());

        if (!isExist) {
            existing.actors.push(userId);
            await existing.save();
        }

        return null;
    }

    // 🟢 CASE 2: Chưa có → tạo mới
    const newNotification = await Notification.create({
        actors: [userId],
        recipient: post.author,
        category: 'SOCIAL',
        action: 'LIKE',
        content: 'đã thích bài viết',
        target: {
            type: 'POST',
            targetId: post._id,
        },
    });

    await newNotification.populate({
        path: 'actors',
        select: '_id firstName lastName avatar',
    });

    return newNotification;
};
