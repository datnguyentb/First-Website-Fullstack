import { useEffect, useState } from 'react';
import userApi from '~/api/user/userApi';

export default function useFetchMeProfile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        const fetchUser = async () => {
            try {
                const res = await userApi.getMe();
                setUserData(res.data.data);
            } catch (error) {
                setError(error.respone.data);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { userData, loading, error };
}
