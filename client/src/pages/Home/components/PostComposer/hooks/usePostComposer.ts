import { useEffect, useRef, useState } from 'react';
import { usePostsContext } from '~/contexts';
import { useImagePreview } from '~/hooks/imagePreview/useImagePreview';

export function usePostComposer() {
    const [isPosting, setIsPosting] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [isPostValid, setIsPostValid] = useState<boolean>(false);
    const { setPosts } = usePostsContext();
    const imageInputRef = useRef<HTMLInputElement>(null);
    const privacyOptionRef = useRef<HTMLInputElement>(null);

    const previewImages = useImagePreview(selectedImages);

    useEffect(() => {
        const hasText = text.trim().length > 0;
        const hasImage = selectedImages.length > 0;
        setIsPostValid(hasText || hasImage);
    }, [text, selectedImages]);

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
