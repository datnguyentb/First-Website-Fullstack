export function handleImagePreview(file, setPreview, oldPreview = null) {
    if (!file) return;

    // Hủy URL cũ nếu có
    if (oldPreview) {
        URL.revokeObjectURL(oldPreview);
    }

    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
}
