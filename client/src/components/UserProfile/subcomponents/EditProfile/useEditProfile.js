import { useState, useEffect } from 'react';
import { useUser } from '~/contexts';
import useFetchMeProfile from '~/hooks/user/useFetchMeProfile';
import { formatDate } from '~/utils/dateUtils';

export const useEditProfile = () => {
    const { user, setUser } = useUser();

    const [initialForm, setInitialForm] = useState({});
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: '',
        birthdate: '',
        location: '',
        bio: '',
        avatarUrl: '',
    });

    // [GET] User
    const { userData, loading, error } = useFetchMeProfile();

    useEffect(() => {
        if (userData) {
            const updated = {
                ...userData,
                birthdate: formatDate(userData.birthdate),
            };
            setForm(updated);
            setInitialForm(updated);
        }
    }, [userData]);

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
