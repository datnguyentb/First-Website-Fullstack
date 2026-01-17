import { useNavigate } from 'react-router-dom'; // Thêm import này
import { toast } from 'react-toastify';
import { useAdminAuthContext } from '~/contexts';
import { delay } from '~/helper/delay';
import useAdminLogin from '~/hooks/admin/auth/useAdminLogin';
import { loginDataResponse } from '~/types/loginDataResponse';
import { loginForm } from '~/types/loginFormData';

export const useAdminLoginSubmit = (formData: loginForm, handleSuccess: (data: loginDataResponse) => void) => {
    const { Login, loading, setLoading } = useAdminLogin();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await Login(formData);
            if (res?.success) {
                handleSuccess(res.data);
            } else {
                toast.error('Login failed. Please try again.', { autoClose: 1000 });
            }
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return { handleSubmit, loading };
};
