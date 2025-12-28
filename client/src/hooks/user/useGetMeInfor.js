import { useCallback, useState } from 'react';
import userApi from '~/api/user/userApi';

export default function useGetMeInfor() {
    const [loading, setLoading] = useState(false);

    const getMe = useCallback(async () => {
        setLoading(true);
        try {
            const res = await userApi.getMeInfor();
            console.log('Get me response:', res.data.data);
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
