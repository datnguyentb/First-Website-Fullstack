import { useEffect, useState } from 'react';
import friendshipApi from '~/api/user/friendshipApi';

export default function useGetFriendshipStatus(id) {
    const [friendshipStatus, setFriendshipStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        setError(null);

        const fetchStatus = async () => {
            try {
                const res = await friendshipApi.getFriendshipStatus(id);
                setFriendshipStatus(res.data.data.status);
            } catch (err) {
                setError(err.response);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, [id]);

    return { friendshipStatus, setFriendshipStatus, loading, error };
}
