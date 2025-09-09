import mongoose from 'mongoose';

const SavedPlaylistSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Ai lưu
        playlist: { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist', required: true }, // Playlist nào
        savedAt: { type: Date, default: Date.now },
    },
    { timestamps: true },
);

export default mongoose.model('SavedPlaylist', SavedPlaylistSchema);
