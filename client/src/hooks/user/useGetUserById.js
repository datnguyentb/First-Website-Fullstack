import { useEffect, useState } from 'react';
import userApi from '~/api/user/userApi';

export default function useGetMe() {
    const [loading, setLoading] = useState(false);

    const getMe = async () => {
        setLoading(true);

        try {
            const res = await userApi.getMeInfor();
            return res.data.data;
        } catch (err) {
            return err.response;
        } finally {
            setLoading(false);
        }
    };
    return { getMe, loading };
}
