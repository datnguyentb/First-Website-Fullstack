// hooks/useImageUpload.js
import { useState, useEffect } from 'react';
import { revokeImagePreview } from '../../utils/imagePreview';

export const useImageUpload = (initialPreview = null) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(initialPreview);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

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
