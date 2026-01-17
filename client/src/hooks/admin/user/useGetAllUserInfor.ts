import { useEffect, useState } from 'react';
import userAdminApi from '~/api/admin/userAdminApi';
import { UserInfo } from '~/types/user';

export default function useGetAllUserInfor() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);
    const [users, setUsers] = useState<UserInfo[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const res = await userAdminApi.getAllUsers();
                console.log(res);
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
