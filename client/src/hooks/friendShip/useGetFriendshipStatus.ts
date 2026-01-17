import { useEffect, useState } from 'react';
import friendshipApi from '~/api/user/friendshipApi';

export default function useGetFriendshipStatus(id: string) {
    const [friendshipStatus, setFriendshipStatus] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        setError(null);

        const fetchStatus = async () => {
            try {
                const res = await friendshipApi.getFriendshipStatus(id);
                setFriendshipStatus(res.data.data.status);
            } catch (err: any) {
                setError(err.response);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, [id]);

    return { friendshipStatus, setFriendshipStatus, loading, error };
}
