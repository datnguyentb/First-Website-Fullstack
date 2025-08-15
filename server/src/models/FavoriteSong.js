import mongoose from 'mongoose';

const favoriteSongSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        trackId: {
            type: String,
            required: true,
        },
        addedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true },
);

favoriteSongSchema.index({ userId: 1, trackId: 1 }, { unique: true });

export default mongoose.model('FavoriteSong', favoriteSongSchema);
