import Notification from '../../models/Notification.js';

export const markAllNotificationsAsRead = async ({ userId }) => {
    try {
        await Notification.updateMany({ recipient: userId }, { isRead: true });
        return true;
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
        throw error;
    }
};
