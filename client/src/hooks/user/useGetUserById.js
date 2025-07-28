import { useEffect, useState } from 'react';
import userApi from '~/api/user/userApi';

export default function useGetUserById() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser?._id) {
            const fetchUser = async () => {
                try {
                    const res = await userApi.getUserById(storedUser._id);
                    setUser(res.data.data);
                } catch {
                    //
                } finally {
                    setLoading(false);
                }
            };
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    return { user, setUser, loading, error };
}
