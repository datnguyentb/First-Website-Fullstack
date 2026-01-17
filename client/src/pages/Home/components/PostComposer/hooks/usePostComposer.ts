import { useEffect, useRef, useState } from 'react';
import { usePostsContext } from '~/contexts';

export function usePostComposer() {
    const [isPosting, setIsPosting] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [isPostValid, setIsPostValid] = useState<boolean>(false);
    const { setPosts } = usePostsContext();
    const imageInputRef = useRef<HTMLInputElement>(null);
    const privacyOptionRef = useRef<HTMLInputElement>(null);

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
        imageInputRef,
        setPosts,
        privacyOptionRef,
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
