// models/RecentlyPlayed.js
import mongoose from 'mongoose';

const recentlyPlayedSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        trackId: {
            type: String, // Spotify Track ID
            required: true,
        },
        playedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true },
);

// Đảm bảo mỗi user chỉ có 1 record cho mỗi bài hát
recentlyPlayedSchema.index({ user: 1, trackId: 1 }, { unique: true });

export default mongoose.model('RecentlyPlayed', recentlyPlayedSchema);
