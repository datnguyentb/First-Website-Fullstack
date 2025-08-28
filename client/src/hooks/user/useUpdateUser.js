import { useState } from 'react';
import userApi from '~/api/user/userApi';
import { toast } from 'react-toastify';

export default function useUpdateUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateUser = async (form, file = null) => {
        setLoading(true);
        setError(null);

        try {
            // 1. Update user info (if any)
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

            // 2. If there is an avatar file, upload it
            if (file) {
                const formData = new FormData();
                formData.append('avatar', file);

                const res2 = await userApi.updateAvatar(formData);
                updatedUser = res2.data.data;
            }

            toast.success('Profile updated successfully!');
            return updatedUser;
        } catch (err) {
            toast.error('Failed to update profile!');
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { updateUser, loading, error };
}
