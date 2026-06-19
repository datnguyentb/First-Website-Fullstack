import { useState, useEffect } from 'react';

type InputFile = File | Blob | string;

export function useImagePreview(imageFiles: InputFile | InputFile[] | null | undefined): string[] {
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    useEffect(() => {
        if (!imageFiles || (Array.isArray(imageFiles) && imageFiles.length === 0)) {
            setPreviewUrls([]);
            return;
        }

        // Luôn biến thành mảng để xử lý
        const filesArray = Array.isArray(imageFiles) ? imageFiles : [imageFiles];

        const urls = filesArray.map((file) => {
            if (file instanceof File || file instanceof Blob) {
                return URL.createObjectURL(file);
            }
            return file;
        });

        setPreviewUrls(urls);

        return () => {
            urls.forEach((url) => {
                if (url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, [imageFiles]);

    return previewUrls;
}
