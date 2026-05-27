import notificationsApi from '~/api/notifications/notificationsApi';

export default function useMarkAllRead() {
    const handleMarkAllAsRead = async () => {
        try {
            const res = await notificationsApi.markAllAsRead();
            return res.data;
        } catch (error) {
            console.error('Failed to mark all notifications as read:', error);
        }
    };

    return {
        handleMarkAllAsRead,
    };
}
