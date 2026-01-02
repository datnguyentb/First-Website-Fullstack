import { Dispatch, SetStateAction } from 'react';

// Hàm để tạo và hủy preview hình ảnh từ file input
export function revokeImagePreview(preview: string | null) {
    if (preview) {
        URL.revokeObjectURL(preview);
    }
}

// Hàm để xử lý preview hình ảnh từ file input (1 ảnh)
export function handleImagePreview(
    file: File,
    setPreview: Dispatch<SetStateAction<string | null>>,
    oldPreview: string | null = null,
) {
    if (!file) return;

    // Hủy URL cũ nếu có
    if (oldPreview) {
        URL.revokeObjectURL(oldPreview);
    }

    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
}

// Hàm để xử lý preview hình ảnh từ file input (nhiều ảnh)
export function handleMultipleImagePreview(
    files: FileList | File[] | undefined | null,
    setPreview: Dispatch<SetStateAction<string[]>>,
    oldPreviews: string[] = [],
) {
    if (!files || files.length === 0) return;

    // Hủy các URL cũ nếu có
    oldPreviews.forEach((preview) => {
        URL.revokeObjectURL(preview);
    });

    const previewURLs = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreview(previewURLs);
}
