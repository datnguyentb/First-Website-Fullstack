// hooks/post/useCreatePost.js
import { useState } from 'react';
import authApi from '~/api/user/authApi';

const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessenge] = useState('');

    const Register = async (form: FormData) => {
        setLoading(true);
        setError(null);

        try {
            const res = await authApi.register(form);
            setMessenge(res.data.message);
            return res;
        } catch (error: any) {
            setMessenge(error.response.data.message);
        } finally {
            //
        }
    };

    return { Register, loading, setLoading, message, error };
};

export default useRegister;
