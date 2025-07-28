import { useEffect, useState } from 'react';
import authAdminApi from '~/api/admin/authAdminApi';

export default function useAdminCheckToken() {
    const [isValid, setIsValid] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('adminToken');

        const checkToken = async () => {
            if (token) {
                try {
                    await authAdminApi.checkToken();
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
