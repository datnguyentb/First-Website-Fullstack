import { useState } from 'react';
import { loginForm } from '~/types/loginFormData';

export const useLoginForm = (initialValues: loginForm) => {
    const [formData, setFormData] = useState<loginForm>(initialValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return { formData, handleChange };
};
