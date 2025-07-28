// hooks/post/useCreatePost.js
import { useState } from 'react';
import authApi from '~/api/user/authApi';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const Login = async (form) => {
        setLoading(true);
        setError(null);

        try {
            const res = await authApi.login(form);
            const { token, user } = res.data.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            return res.data;
        } catch (error) {
            return error.response.data;
        } finally {
            //
        }
    };

    return { Login, loading, error, setLoading };
};

export default useLogin;
