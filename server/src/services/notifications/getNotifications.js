import { formatNotification } from '../../helper/notification/formatNotification.js';
import Notification from '../../models/Notification.js';

export const getNotifications = async ({ userId }) => {
    const notifications = await Notification.find({ recipient: userId }).sort({ createdAt: -1 }).populate({
        path: 'actors',
        select: '_id firstName lastName avatar',
    });

    const formattedNotifications = notifications.map(formatNotification);

    return formattedNotifications;
};
