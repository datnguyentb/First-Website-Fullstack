import { useEffect, useState } from 'react';
import userApi from '~/api/user/userApi';
import { useUser } from '~/contexts/useUser';

export default function useFetchMeProfile() {
    const { user } = useUser();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) return;

        const fetchUser = async () => {
            setLoading(true);
            try {
                const res = await userApi.getUserByIdAll(user.id);
                setUserData(res.data.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [user]);

    return { userData, loading, error };
}
