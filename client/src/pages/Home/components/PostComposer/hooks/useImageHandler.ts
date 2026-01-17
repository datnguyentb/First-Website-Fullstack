import React from 'react';
import { toast } from 'react-toastify';

// hooks/useImageHandler.js
export const useImageHandler = (
    selectedImages: File[],
    setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>,
) => {
    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const newFiles = Array.from(e.target.files);
        const totalSlotsLeft = 5 - selectedImages.length;

        if (totalSlotsLeft <= 0) {
            toast.warning('You can only upload a maximum of 5 images.');
            e.target.value = ''; // Reset input
            return;
        }

        // Nếu chọn nhiều hơn số chỗ còn trống, chỉ lấy số lượng đủ 5
        let filesToAdd = newFiles;
        if (newFiles.length > totalSlotsLeft) {
            toast.info(`Only the first ${totalSlotsLeft} images were added.`);
            filesToAdd = newFiles.slice(0, totalSlotsLeft);
        }

        // Kiểm tra trùng lặp (Optional)
        const uniqueFiles = filesToAdd.filter(
            (file) => !selectedImages.some((prev) => prev.name === file.name && prev.size === file.size),
        );

        if (uniqueFiles.length > 0) {
            setSelectedImages((prev) => [...prev, ...uniqueFiles]);
        }

        e.target.value = '';
    };

    const handlePasteImage = (e: React.ClipboardEvent) => {
        const items = Array.from(e.clipboardData?.items || []);

        const pasted = items
            .filter((item) => item.type.includes('image'))
            .map((item, i) => {
                const blob = item.getAsFile();
                return blob ? new File([blob], `pasted-${Date.now()}-${i}.png`, { type: blob.type }) : null;
            })
            .filter((file): file is File => file !== null); // Loại bỏ các giá trị null

        if (selectedImages.length + pasted.length > 5) {
            toast.warning('Please select no more than 5 images.');
            return;
        }
        setSelectedImages((prev) => [...prev, ...pasted]);
    };

    const handleRemovePreview = (index: number) => {
        setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    };

    return { handleImageSelect, handlePasteImage, handleRemovePreview };
};
