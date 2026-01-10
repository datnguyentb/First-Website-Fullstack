// hooks/useImageHandler.js
export const useImageHandler = (selectedImages, setSelectedImages) => {
    const handleImageSelect = (e) => {
        const files = [...e.target.files];
        if (files.length + selectedImages.length > 5) {
            toast.warning('Please select no more than 5 images.');
            e.target.value = '';
            return;
        }
        setSelectedImages((prev) => [...prev, ...files]);
    };

    const handlePasteImage = (e) => {
        // ... logic paste ảnh của bạn đưa vào đây
    };

    const handleRemovePreview = (index) => {
        setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    };

    return { handleImageSelect, handlePasteImage, handleRemovePreview };
};
