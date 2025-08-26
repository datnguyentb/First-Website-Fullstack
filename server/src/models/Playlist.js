import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema(
    {
        spotifyId: {
            type: String, // Spotify playlist id
            required: true,
            unique: true,
            trim: true,
        },
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
            enum: ['playlist'],
            default: 'playlist',
        },
        images: [
            {
                url: { type: String, required: true, trim: true },
                height: { type: Number },
                width: { type: Number },
            },
        ],
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
