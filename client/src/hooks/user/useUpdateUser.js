import { useState } from 'react';
import userApi from '~/api/user/userApi';
import { toast } from 'react-toastify';

const useUpdateUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateUser = async (form, file = null) => {
        setLoading(true);
        setError(null);

        try {
            // 1. Gửi thông tin người dùng (nếu có)
            const res1 = await userApi.updateUserInfo({
                firstName: form.firstName,
                lastName: form.lastName,
                phone: form.phone,
                gender: form.gender,
                birthdate: form.birthdate,
                location: form.location,
                bio: form.bio,
            });

            let updatedUser = res1.data.data;

            // 2. Nếu có file avatar thì cập nhật tiếp
            if (file) {
                const formData = new FormData();
                formData.append('avatar', file);

                const res2 = await userApi.updateAvatar(formData);
                updatedUser = res2.data.data;
            }

            toast.success('Cập nhật thành công!');
            return updatedUser;
        } catch (err) {
            toast.error('Cập nhật thất bại!');
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { updateUser, loading, error };
};

export default useUpdateUser;
