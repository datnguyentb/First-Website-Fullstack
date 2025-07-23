// hooks/post/useCreatePost.js
import { useState } from 'react';
import authAdminApi from '~/api/admin/authAdminApi';

const useAdminLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [messageError, setMessengeError] = useState('');

    const Login = async (form) => {
        setLoading(true);
        setError(null);

        try {
            const res = await authAdminApi.login(form);
            const { token, user } = res.data.data;

            localStorage.setItem('adminToken', token);
            localStorage.setItem('admin', JSON.stringify(user));
            return res.data;
        } catch (error) {
            const message = error.response?.data?.message || 'An error occurred. Please try again.';
            setError(error);
            setMessengeError(message);
        } finally {
            //
        }
    };

    return { Login, loading, messageError, error, setLoading };
};

export default useAdminLogin;
