import mongoose from 'mongoose';
const { Schema } = mongoose;

const playlistSchema = new mongoose.Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
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
            enum: ['playlist', 'favorite'],
            default: 'playlist',
        },
        images: {
            type: String,
            default: '',
        },
        tracks: [
            {
                track: {
                    type: Schema.Types.ObjectId,
                    ref: 'Song',
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
