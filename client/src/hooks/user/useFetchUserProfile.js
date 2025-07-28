import { useEffect, useState } from 'react';
import userApi from '~/api/user/userApi';

export default function useFetchUserProfile(userId, currentUser) {
    const [userData, setUserData] = useState(null);
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId || !currentUser) return;

        const fetchUser = async () => {
            setLoading(true);
            try {
                if (userId === currentUser._id) {
                    setUserData(currentUser);
                    setIsCurrentUser(true);
                } else {
                    const res = await userApi.getUserById(userId);
                    setUserData(res.data.data);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId, currentUser]);

    return { userData, isCurrentUser, loading, error };
}
