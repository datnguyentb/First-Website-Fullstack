import mongoose from 'mongoose';
import WallpaperSchema from './WallpaperSchema';

const ChatThemeSchema = new mongoose.Schema({
    key: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },
    name: { type: String, required: true },

    config: {
        light_mode: {
            wallpaper: WallpaperSchema,
            bubble_gradient: [String],
            text_color: { type: String, default: '#000000' },
            accent_color: { type: String, default: '#0084ff' },
        },
        dark_mode: {
            wallpaper: WallpaperSchema,
            bubble_gradient: [String],
            text_color: { type: String, default: '#FFFFFF' },
            accent_color: { type: String, default: '#0084ff' },
        },
        // Icon cảm xúc nhanh (như nút Like ở Messenger)
        quick_emoji: { type: String, default: '👍' },
    },

    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
});

export default mongoose.model('ChatThemeSchema', ChatThemeSchema);
