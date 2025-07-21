import { useEffect, useState } from 'react';

export function usePostComposer() {
    const [isPosting, setIsPosting] = useState(false);
    const [text, setText] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [isPostValid, setIsPostValid] = useState(false);

    useEffect(() => {
        const hasText = text.trim().length > 0;
        const hasImage = selectedImages.length > 0;
        setIsPostValid(hasText || hasImage);
    }, [text, selectedImages]);

    useEffect(() => {
        if (selectedImages.length === 0) {
            setPreviewImages([]);
            return;
        }

        const previews = selectedImages.map((file) => URL.createObjectURL(file));
        setPreviewImages(previews);

        return () => previews.forEach((url) => URL.revokeObjectURL(url));
    }, [selectedImages]);

    return {
        isPosting,
        setIsPosting,
        text,
        setText,
        selectedImages,
        setSelectedImages,
        previewImages,
        isPostValid,
    };
}
