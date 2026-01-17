// hooks/useImageUpload.js
import React, { useState, useEffect } from 'react';
import { revokeImagePreview } from '../../utils/imagePreview';

export const useImageUpload = (initialPreview = null) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(initialPreview);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    useEffect(() => {
        if (!file) {
            if (!initialPreview) setPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        return () => revokeImagePreview(objectUrl);
    }, [file, initialPreview]);

    return { file, preview, handleFileChange, setPreview, setFile };
};
