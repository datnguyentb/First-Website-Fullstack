import { useEffect, useState } from 'react';
import userAdminApi from '~/api/admin/userAdminApi';

export default function useFetchUserNumber() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userCount, setUserCount] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const res = await userAdminApi.getUserNumber();
                setUserCount(res.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { userCount, loading, error };
}
