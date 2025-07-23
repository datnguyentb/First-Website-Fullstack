// hooks/post/useCreatePost.js
import { useState } from 'react';
import authApi from '~/api/authApi';

const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessenge] = useState('');

    const Register = async (form) => {
        setLoading(true);
        setError(null);

        try {
            const res = await authApi.register(form);
            setMessenge(res.data.message);
            return res;
        } catch (error) {
            setMessenge(error.response.data.message || 'An error occurred. Please try again.');
        } finally {
            //
        }
    };

    return { Register, loading, setLoading, message, error };
};

export default useRegister;
