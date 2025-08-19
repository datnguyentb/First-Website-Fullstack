// models/AdminRecommendPlaylist.js
import mongoose from 'mongoose';

const SongsSchema = new mongoose.Schema(
    {
        spotifyId: {
            type: String,
            trim: true,
            required: true,
        },
        name: {
            type: String,
            trim: true,
            required: true,
        },
        artists: {
            type: [
                {
                    name: { type: String, required: true, trim: true },
                    role: { type: String, enum: ['main', 'feat'], default: 'main' },
                },
            ],
            default: [],
        },

        url: {
            type: String,
            trim: true,
            default: '',
        },
        type: {
            type: String,
            enum: ['track', 'playlist'],
            required: true,
        },
        status: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Songs', SongsSchema);
