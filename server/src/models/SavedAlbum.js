import mongoose from 'mongoose';

const savedAlbumSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    albumId: {
        type: String, // ID album trên Spotify
        required: true,
    },
    addedAt: {
        type: Date,
        default: Date.now,
    },
});

savedAlbumSchema.index({ userId: 1, albumId: 1 }, { unique: true });

export default mongoose.model('SavedAlbum', savedAlbumSchema);
