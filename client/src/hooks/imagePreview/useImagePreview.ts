import { useState, useEffect } from 'react';

type InputFile = File | File[] | Blob | Blob[] | string;

export function useImagePreview(imageFile: InputFile | null | undefined): string {
    const [previewUrl, setPreviewUrl] = useState<string>('');

    useEffect(() => {
        // Nếu không có dữ liệu (null/undefined/'')
        if (!imageFile) {
            setPreviewUrl('');
            return;
        }

        // Nếu dữ liệu là chuỗi đường dẫn (URL string hoặc base64)
        if (typeof imageFile === 'string') {
            setPreviewUrl(imageFile);
            return;
        }

        // KIỂM TRA CHẮC CHẮN: Phải là File hoặc Blob thì mới tạo Object URL
        if (imageFile instanceof Blob || imageFile instanceof File) {
            const objectUrl = URL.createObjectURL(imageFile);
            setPreviewUrl(objectUrl);

            return () => {
                URL.revokeObjectURL(objectUrl);
            };
        }

        //Create preview Images
        if (Array.isArray(imageFile) && imageFile.length >= 1) {
            const generatedUrls: string[] = [];

            const arrayUrl = imageFile
                .map((file) => {
                    if (file instanceof Blob || (file as any) instanceof File) {
                        const url = URL.createObjectURL(file);
                        generatedUrls.push(url);
                        return url;
                    }
                    if (typeof file === 'string') {
                        return file;
                    }
                    return '';
                })
                .filter((url) => url !== '');

            setPreviewUrl(arrayUrl as any);

            // Hàm cleanup: Thu hồi TOÀN BỘ các Object URL đã tạo cho mảng này
            return () => {
                generatedUrls.forEach((url) => URL.revokeObjectURL(url));
            };
        }
        setPreviewUrl('');
    }, [imageFile]);

    return previewUrl;
}
