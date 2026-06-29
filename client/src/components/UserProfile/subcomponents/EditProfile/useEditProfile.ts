import { useState, useEffect } from 'react';
import { useUserContext } from '~/contexts';
import { useImagePreview } from '~/hooks/imagePreview/useImagePreview';
import useFetchMeProfile from '~/hooks/user/useFetchMeProfile';
import { formatDate } from '~/utils/dateUtils';

export const useEditProfile = () => {
    const { user, setUser } = useUserContext();

    const [initialForm, setInitialForm] = useState({});
    const [file, setFile] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [form, setForm] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        gender: user.gender || 'other',
        birthdate: user.birthdate ? formatDate(user.birthdate) : '',
        location: user.location || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
    });

    //state lưu form ban đầu
    useEffect(() => {
        setInitialForm(form);
    }, []);

    // Create Image Preview Url
    const preview = useImagePreview(file);

    // 👉 Revoke preview URL when unmounted
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    // 👉 Enable Save when form is changed
    useEffect(() => {
        const isChanged = JSON.stringify(form) !== JSON.stringify(initialForm);
        setDisabled(!isChanged);
    }, [form, initialForm]);

    return {
        user,
        setUser,
        form,
        setForm,
        preview,
        file,
        setFile,
        disabled,
        setDisabled,
        setInitialForm,
    };
};
