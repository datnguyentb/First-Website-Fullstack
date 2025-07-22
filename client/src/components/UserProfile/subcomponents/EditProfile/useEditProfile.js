import { useState, useEffect } from 'react';
import userApi from '~/api/userApi';
import { useUser } from '~/contexts/useUser';
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

    //[GET] User
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await userApi.getUserByIdAll(user.id);
                const data = res.data.data;

                if (data.birthdate) {
                    data.birthdate = formatDate(data.birthdate);
                }

                setForm(data);
                setInitialForm(data);
            } catch (error) {
                console.error('Lỗi khi tải thông tin người dùng:', error);
            }
        };

        fetchUser();
    }, [user.id]);

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

    return { user, setUser, form, setForm, preview, setPreview, file, setFile, disabled, setDisabled, setInitialForm };
};
