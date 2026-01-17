import { useState, useEffect } from 'react';
import { useUserContext } from '~/contexts';
import useFetchMeProfile from '~/hooks/user/useFetchMeProfile';
import { formatDate } from '~/utils/dateUtils';

export const useEditProfile = () => {
    const { user, setUser } = useUserContext();

    const [initialForm, setInitialForm] = useState({});
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
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

    // [GET] User
    const { userData, loading, error } = useFetchMeProfile();

    useEffect(() => {
        setInitialForm(form);
    }, []);

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
        setPreview,
        file,
        setFile,
        disabled,
        setDisabled,
        setInitialForm,
        loading,
        error,
    };
};
