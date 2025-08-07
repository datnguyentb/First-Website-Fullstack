import { useState } from 'react';
import { toast } from 'react-toastify';
import friendshipApi from '~/api/user/friendshipApi';

export default function useUnfollowUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const unfollowUser = async (userId) => {
        if (!userId) return;
        setLoading(true);
        setError(null);
        try {
            const res = await friendshipApi.unfollowUser(userId);
            return res.data;
        } catch (err) {
            setError(err.response?.data || 'Error occurred');
            // toast.error(err.response.data.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, unfollowUser };
}
