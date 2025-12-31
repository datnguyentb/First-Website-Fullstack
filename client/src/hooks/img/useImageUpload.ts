// hooks/useImageUpload.js
import { useState, useEffect } from 'react';

export const useImageUpload = (initialPreview = null) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(initialPreview);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    useEffect(() => {
        if (!file) {
            if (!initialPreview) setPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [file, initialPreview]);

    return { file, preview, handleFileChange, setPreview, setFile };
};
