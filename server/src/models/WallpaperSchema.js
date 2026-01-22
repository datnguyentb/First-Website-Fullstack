const WallpaperSchema = new mongoose.Schema(
    {
        image_url: { type: String, default: null },
        fallback_color: { type: String, required: true }, // Ví dụ: "#ffffff"
        blur_hash: { type: String, default: null }, // Hỗ trợ hiển thị ảnh mờ khi đang load
    },
    { _id: false },
);

export default mongoose.model('WallpaperSchema', WallpaperSchema);
