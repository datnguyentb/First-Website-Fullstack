import { useEffect, useState } from 'react';
import notificationsApi from '~/api/notifications/notificationsApi';

export default function useGetNotifications() {
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            setLoading(true);
            try {
                const res = await notificationsApi.getAllNotifications();
                if (res.data?.success) setNotifications(res.data.data);
            } catch (err: any) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    return { loading, notifications };
}
