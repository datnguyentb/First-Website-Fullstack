import { useEffect, useState } from 'react';
import authApi from '~/api/user/authApi';

export default function useCheckToken() {
    const [isValid, setIsValid] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null);
        const token = localStorage.getItem('token');

        const checkToken = async () => {
            if (token) {
                try {
                    const check = await authApi.checkToken();
                    if (check) setIsValid(true);
                } catch {
                    setIsValid(false);
                }
            } else {
                setIsValid(false);
            }
        };
        checkToken();
    }, []);

    return { isValid, setIsValid, error };
}
