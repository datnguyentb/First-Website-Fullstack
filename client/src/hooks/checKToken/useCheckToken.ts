import { useEffect, useState } from 'react';
import authApi from '~/api/user/authApi';

export default function useCheckToken() {
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        setError(null);
        const token = localStorage.getItem('token');

        const checkToken = async () => {
            if (token) {
                try {
                    const check = await authApi.checkToken();
                    if (check) setIsValid(true);
                } catch (err) {
                    console.log(
                        'Your session has expired. For security reasons, you have been logged out. Please log in again.',
                    );
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
