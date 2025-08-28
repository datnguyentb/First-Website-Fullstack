import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: '',
            trim: true,
        },
        type: {
            type: String,
            default: 'playlist',
        },
        images: {
            type: String,
            default: '',
        },
        tracks: [
            {
                trackId: {
                    type: String,
                    required: true,
                },
                addedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        isPublic: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

export default mongoose.model('Playlist', playlistSchema);
