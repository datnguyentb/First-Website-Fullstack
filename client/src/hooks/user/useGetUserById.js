import { useCallback, useState } from 'react';
import userApi from '~/api/user/userApi';

export default function useGetMe() {
    const [loading, setLoading] = useState(false);

    const getMe = useCallback(async () => {
        setLoading(true);
        try {
            const res = await userApi.getMeInfor();
            return res.data.data;
        } catch (err) {
            console.error('Get me error:', err);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return { getMe, loading };
}
