import { useEffect, useState } from 'react';
import userAdminApi from '~/api/admin/userAdminApi';

export default function useGetAllUserInfor() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const res = await userAdminApi.getAllUsers();
                setUsers(res.data.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { users, loading, error };
}
