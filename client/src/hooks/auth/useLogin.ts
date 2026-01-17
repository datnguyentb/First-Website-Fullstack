// hooks/post/useCreatePost.js
import { useState } from 'react';
import authApi from '~/api/user/authApi';

const useLogin = () => {
    const [loading, setLoading] = useState(false);

    const Login = async (form: FormData) => {
        setLoading(true);

        try {
            const res = await authApi.login(form);
            return res.data;
        } catch (error: any) {
            return error.response.data;
        } finally {
            //
        }
    };

    return { Login, loading, setLoading };
};

export default useLogin;
