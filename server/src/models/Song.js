// models/AdminRecommendPlaylist.js
import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema(
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
        album: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Album',
            required: true,
        },
        artists: {
            type: [
                {
                    id: { type: String, required: true, trim: true },
                    name: { type: String, required: true, trim: true },
                    href: { type: String, trim: true },
                    uri: { type: String, trim: true },
                    role: { type: String, enum: ['main', 'feat'], default: 'main' },
                },
            ],
            required: true,
            validate: {
                validator: function (arr) {
                    return arr.length > 0;
                },
                message: 'Song must have at least 1 artist',
            },
        },
        type: {
            type: String,
            enum: ['track'],
            default: 'track',
        },
        url: {
            type: String,
            trim: true,
            default: '',
        },
        isReady: {
            type: Boolean,
            default: false,
        },
        listenCount: {
            type: Number,
            default: 0,
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

export default mongoose.model('Song', SongSchema);
