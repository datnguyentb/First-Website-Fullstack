import { useState, useEffect } from 'react';

type InputFile = File | Blob | string;

export function useImagePreview(imageFile: InputFile | null | undefined): string {
    const [previewUrl, setPreviewUrl] = useState<string>('');

    useEffect(() => {
        if (!imageFile) {
            setPreviewUrl('');
            return;
        }

        if (typeof imageFile === 'string') {
            setPreviewUrl(imageFile);
            return;
        }

        const objectUrl = URL.createObjectURL(imageFile);
        setPreviewUrl(objectUrl);

        return () => {
            if (objectUrl.startsWith('blob:')) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [imageFile]);

    return previewUrl;
}
