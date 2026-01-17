// hooks/post/useCreatePost.js
import { useState } from 'react';
import authAdminApi from '~/api/admin/authAdminApi';
import { loginForm } from '~/types/loginFormData';

const useAdminLogin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    const [messageError, setMessageError] = useState<string>('');

    const Login = async (form: loginForm) => {
        setLoading(true);
        setError(null);

        try {
            const result = await authAdminApi.login(form);
            return result.data;
        } catch (error: any) {
            const message = error.response?.data?.message || 'An error occurred. Please try again.';
            setError(error);
            setMessageError(message);
        } finally {
            //
        }
    };

    return { Login, loading, messageError, error, setLoading };
};

export default useAdminLogin;
