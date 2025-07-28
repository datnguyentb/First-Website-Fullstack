import { useEffect, useState } from 'react';
import authApi from '~/api/user/authApi';

export default function useCheckToken() {
    const [isValid, setIsValid] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');

        const checkToken = async () => {
            if (token) {
                try {
                    await authApi.checkToken();
                    setIsValid(true);
                } catch {
                    setIsValid(false);
                } finally {
                    setLoading(false);
                }
            } else {
                setIsValid(false);
                setLoading(false);
            }
        };
        checkToken();
    }, []);

    return { isValid, setIsValid, loading, error };
}
